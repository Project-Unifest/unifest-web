import {
  API_URL,
  HTTPHeaderKey,
  getAuthorziationValue,
} from "./../../../shared/api/config";
import { Booth, BoothList } from "@/src/shared/lib/types";

export const getBoothList = async (accessToken: string) => {
  const response = await fetch(`${API_URL}/members/my`, {
    headers: {
      [`${HTTPHeaderKey.AUTHORIZATION}`]: getAuthorziationValue(accessToken),
    },
  });

  const data = await response.json();
  return data;
};
