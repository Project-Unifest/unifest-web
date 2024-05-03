import { HTTPHeaderKey, HTTPHeaderValue } from "./../../../shared/api/config";
import { API_URL, HTTPMethod } from "@/src/shared/api/config";

interface Credentials {
  id: string;
  password: string;
}

export const signIn = async (credentials: Credentials) => {
  const response = await fetch(`${API_URL}/login`, {
    method: HTTPMethod.POST,
    headers: {
      [`${HTTPHeaderKey.CONTENT_TYPE}`]: HTTPHeaderValue.APPLICATION_JSON,
    },
    body: JSON.stringify(credentials),
  });
  const authorization = response.headers.get(HTTPHeaderKey.AUTHORIZATION)!;

  const accessToken = authorization.split(" ")[1];
  const refreshToken = response.headers.get(HTTPHeaderKey.REFRESH_TOKEN)!;
  console.log(refreshToken);

  return { accessToken, refreshToken };
};
