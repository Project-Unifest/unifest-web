import ky, {
  HTTPError,
  KyInstance,
  Options as KyOptions,
  TimeoutError,
} from "ky";
import { API_URL, getAccessToken, HTTPHeaderKey } from "./config";
import { useAuthStore } from "../model/store/auth-store";
import {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  NetworkError,
  NotFoundError,
  ServerError,
  ServiceUnavailableError,
  UnauthorizedError,
  ValidationError,
} from "./errors";
import { match, P } from "ts-pattern";

const defaultConfig: KyOptions = {
  prefixUrl: API_URL,
  timeout: false,
  retry: {
    limit: 2,
    methods: ["get", "put", "post", "delete", "patch"],
    statusCodes: [408, 413, 429, 500, 502, 503, 504],
  },
};

export const publicClient = ky.create({
  ...defaultConfig,
  hooks: {
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 401) {
          alert("아이디 또는 비밀번호를 다시 확인해주세요.");
        }
      },
    ],
  },
});

const refreshClient = ky.create({
  ...defaultConfig,
  retry: 0,
});

const handleHttpError = async ({
  request,
  response,
  options,
}: HTTPError): Promise<HTTPError> => {
  throw match(response.status)
    .with(401, () => new UnauthorizedError(response, request, options))
    .with(403, () => new ForbiddenError(response, request, options))
    .with(409, () => new ConflictError(response, request, options))
    .with(400, () => new BadRequestError(response, request, options))
    .with(422, () => new ValidationError(response, request, options))
    .with(503, () => new ServiceUnavailableError(response, request, options))
    .otherwise(() => new ServerError(response, request, options));
};

const refreshAccessToken = async (refreshToken: string): Promise<string> => {
  const response = await refreshClient.post("reissue", {
    headers: {
      [HTTPHeaderKey.REFRESH_TOKEN]: refreshToken,
    },
  });

  const authorization = response.headers.get(HTTPHeaderKey.AUTHORIZATION);
  if (!authorization) {
    throw new Error("Missing Authorization header in refresh token response");
  }
  return getAccessToken(authorization);
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
          const { refreshToken, refresh } = useAuthStore.getState();

          if (!refreshToken) {
            throw new UnauthorizedError(response, request, options);
          }

          try {
            const newAccessToken = await refreshAccessToken(refreshToken);
            refresh(newAccessToken);

            request.headers.set("Authorization", `Bearer ${newAccessToken}`);
            return client(request);
          } catch (error) {
            throw new UnauthorizedError(response, request, options);
          }
        }
      },
    ],
    beforeError: [handleHttpError],
  },
});
