import {
  API_URL,
  getAuthorziationValue,
  HTTPHeaderKey,
} from "@/src/shared/api/config";

export const fetchGroups = async (accessToken: string, boothId: string) => {
  const response = await fetch(`${API_URL}/waiting/${boothId}/all`, {
    headers: {
      [`${HTTPHeaderKey.AUTHORIZATION}`]: getAuthorziationValue(accessToken),
    },
  });
  const data = await response.json();
  return data;
};
