import {
  API_URL,
  getAuthorziationValue,
  HTTPHeaderKey,
  HTTPHeaderValue,
  HTTPMethod,
} from "@/src/shared/api/config";
import { MenuStatus } from "../lib/types";

export const updateMenuStatus = async (
  accessToken: string,
  menuId: number,
  menuStatus: MenuStatus,
) => {
  const response = await fetch(`${API_URL}/api/menus/${menuId}/status`, {
    method: HTTPMethod.PUT,
    headers: {
      [HTTPHeaderKey.AUTHORIZATION]: getAuthorziationValue(accessToken),
      [HTTPHeaderKey.CONTENT_TYPE]: HTTPHeaderValue.APPLICATION_JSON,
    },
    body: JSON.stringify({
      menuStatus,
    }),
  });
  const data = await response.json();
  return data;
};
