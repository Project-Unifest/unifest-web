import {
  API_URL,
  HTTPHeaderKey,
  HTTPHeaderValue,
  HTTPMethod,
  getAuthorziationValue,
} from "@/src/shared/api/config";

export const makeMegaphone = async (
  accessToken: string,
  boothId: number,
  msg: { msgBody: string },
) => {
  const response = await fetch(`${API_URL}/booths/${boothId}/announcement`, {
    method: HTTPMethod.POST,
    headers: {
      [`${HTTPHeaderKey.CONTENT_TYPE}`]: HTTPHeaderValue.APPLICATION_JSON,
      [`${HTTPHeaderKey.AUTHORIZATION}`]: getAuthorziationValue(accessToken),
    },
    body: JSON.stringify(msg),
  });
  const data = await response.json();
  return data;
};
