import {
  API_URL,
  getAuthorziationValue,
  HTTPHeaderKey,
} from "@/src/shared/api/config";

export const fetchPIN = async (accessToken: string, boothId: number) => {
  const response = await fetch(`${API_URL}/waiting/pin/${boothId}`, {
    headers: {
      [`${HTTPHeaderKey.AUTHORIZATION}`]: getAuthorziationValue(accessToken),
    },
  });
  const data = await response.json();
  return data;
};
