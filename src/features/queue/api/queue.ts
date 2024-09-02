import {
  API_URL,
  getAuthorziationValue,
  HTTPHeaderKey,
  HTTPMethod,
} from "@/src/shared/api/config";

export const cancelGroup = async (accessToken: string, waitingId: string) => {
  const response = await fetch(`${API_URL}/waiting/${waitingId}/noshow`, {
    method: HTTPMethod.PUT,
    headers: {
      [HTTPHeaderKey.AUTHORIZATION]: getAuthorziationValue(accessToken),
    },
  });
  const data = response.json();
  return data;
};
