import ky, { HTTPError, KyInstance, Options as KyOptions } from "ky";
import { API_URL } from "./config";
import { useAuthStore } from "../model/provider/auth-store-provider";

const defaultConfig: KyOptions = {
  prefixUrl: API_URL,
  timeout: 10000,
  retry: {
    limit: 2,
    methods: ["get", "put", "post", "delete", "patch"],
    statusCodes: [408, 413, 429, 500, 502, 503, 504],
  },
};

export const publicClient = ky.create(defaultConfig);

const refreshClient = ky.create({
  ...defaultConfig,
  retry: 0,
});

const refreshAccessToken = async (refreshToken: string): Promise<string> => {
  const data = await refreshClient
    .post("reissue", {
      json: { refreshToken },
    })
    .json<{ accessToken: string }>();

  return data.accessToken;
};

export const client = ky.create({
  ...defaultConfig,
  hooks: {
    beforeRequest: [
      (request) => {
        const { accessToken } = useAuthStore.getState();
        if (accessToken) {
          request.headers.set("Authorization", `Bearer ${accessToken}`);
        }
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 401) {
          const { refreshToken, setAccessToken } = useAuthStore.getState();

          if (!refreshToken) {
            throw new HTTPError(response, request, options);
          }

          try {
            const newAccessToken = await refreshAccessToken(refreshToken);
            setAccessToken(newAccessToken);

            request.headers.set("Authorization", `Bearer ${newAccessToken}`);
            return client(request);
          } catch (error) {
            throw new HTTPError(response, request, options);
          }
        }
      },
    ],
  },
});
