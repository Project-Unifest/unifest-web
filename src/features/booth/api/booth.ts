import {
  API_URL,
  HTTPHeaderKey,
  HTTPMethod,
  getAuthorziationValue,
} from "@/src/shared/api/config";

export const deleteBooth = async (accessToken: string, id: string) => {
  const response = await fetch(`${API_URL}/api/booths/${id}`, {
    method: HTTPMethod.DELETE,
    headers: {
      [`${HTTPHeaderKey.AUTHORIZATION}`]: getAuthorziationValue(accessToken),
    },
  });
  const data = await response.json();
  return data;
};
