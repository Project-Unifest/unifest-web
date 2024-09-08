import { API_URL, HTTPHeaderKey, HTTPMethod } from "@/src/shared/api/config";

export const reissuePIN = async (accessToken: string, boothId: number) => {
  const response = await fetch(`${API_URL}/waiting/pin/${boothId}`, {
    method: HTTPMethod.POST,
    headers: {
      [HTTPHeaderKey.AUTHORIZATION]: accessToken,
    },
  });

  const data = await response.json();
  return data;
};
