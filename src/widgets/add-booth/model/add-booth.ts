import {
  API_URL,
  HTTPHeaderKey,
  HTTPHeaderValue,
  HTTPMethod,
  getAuthorziationValue,
} from "@/src/shared/api/config";
import { Booth } from "@/src/shared/lib/types";

export const addBooth = async (
  accessToken: string,
  booth: Pick<
    Booth,
    "name" | "category" | "description" | "longitude" | "latitude"
  >,
) => {
  const response = await fetch(`${API_URL}/api/booths`, {
    method: HTTPMethod.POST,
    headers: {
      [`${HTTPHeaderKey.CONTENT_TYPE}`]: HTTPHeaderValue.APPLICATION_JSON,
      [`${HTTPHeaderKey.AUTHORIZATION}`]: getAuthorziationValue(accessToken),
    },
    body: JSON.stringify(booth),
  });

  return response;
};
