import {
  API_URL,
  HTTPHeaderKey,
  HTTPHeaderValue,
  HTTPMethod,
  getAuthorziationValue,
} from "@/src/shared/api/config";

export const uploadMenuItem = async (
  accessToken: string,
  boothId: number,
  menuItem: { name: string; price: number; imgUrl: string },
) => {
  const response = await fetch(`${API_URL}/api/menus/${boothId}`, {
    method: HTTPMethod.POST,
    headers: {
      [`${HTTPHeaderKey.CONTENT_TYPE}`]: HTTPHeaderValue.APPLICATION_JSON,
      [`${HTTPHeaderKey.AUTHORIZATION}`]: getAuthorziationValue(accessToken),
    },
    body: JSON.stringify(menuItem),
  });
  const data = await response.json();
  return data;
};

export const deleteMenuItem = async (accessToken: string, menuId: number) => {
  const response = await fetch(`${API_URL}/api/menus/${menuId}`, {
    method: HTTPMethod.DELETE,
    headers: {
      [`${HTTPHeaderKey.AUTHORIZATION}`]: getAuthorziationValue(accessToken),
    },
  });
  const data = await response.json();
  return data;
};
