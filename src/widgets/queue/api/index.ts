import {
  API_URL,
  getAuthorziationValue,
  HTTPHeaderKey,
  HTTPMethod,
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

export const callGroup = async (waitingId: number): Response => {
  const response = await fetch(`${API_URL}/waiting/${waitingId}/call`, {
    method: HTTPMethod.PUT,
  });

  const data = await response.json();
  return data;
};
