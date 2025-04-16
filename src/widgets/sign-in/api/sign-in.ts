import { publicClient } from "@/src/shared/api/client";
import { HTTPHeaderKey } from "@/src/shared/api/config";
import { ApiResponse } from "@/src/shared/api/types";

interface Credentials {
  id: string;
  password: string;
}

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export const signIn = async (credentials: Credentials): Promise<AuthTokens> => {
  const response = await publicClient.post("login", {
    json: credentials,
  });

  const authorization = response.headers.get(HTTPHeaderKey.AUTHORIZATION)!;
  const accessToken = authorization.split(" ")[1];
  const refreshToken = response.headers.get(HTTPHeaderKey.REFRESH_TOKEN)!;

  return { accessToken, refreshToken };
};
