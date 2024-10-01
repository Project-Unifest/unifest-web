import {
  API_URL,
  HTTPHeaderKey,
  HTTPHeaderValue,
  HTTPMethod,
  getAuthorziationValue,
} from "@/src/shared/api/config";

import { Product } from "@/src/shared/lib/types";
import { MenuStatus } from "../lib/types";

interface ProductForFetch {
  name: string;
  price: number;
  imgUrl?: string;
  menuStatus: MenuStatus;
}

export const uploadMenuItem = async (
  accessToken: string,
  boothId: number,
  menuItem: ProductForFetch,
) => {
  const _menu: ProductForFetch = {
    name: menuItem.name,
    price: menuItem.price,
    imgUrl: menuItem.imgUrl,
    menuStatus: menuItem.menuStatus,
  };
  const response = await fetch(`${API_URL}/api/menus/${boothId}`, {
    method: HTTPMethod.POST,
    headers: {
      [`${HTTPHeaderKey.CONTENT_TYPE}`]: HTTPHeaderValue.APPLICATION_JSON,
      [`${HTTPHeaderKey.AUTHORIZATION}`]: getAuthorziationValue(accessToken),
    },
    body: JSON.stringify(_menu),
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

export const editMenu = async (accessToken: string, menuItem: Product) => {
  const _menu: ProductForFetch = {
    name: menuItem.name,
    price: menuItem.price,
    imgUrl: menuItem.imgUrl,
    menuStatus: menuItem.menuStatus,
  };

  const response = await fetch(`${API_URL}/api/menus/${menuItem.id}`, {
    method: HTTPMethod.PATCH,
    headers: {
      [`${HTTPHeaderKey.CONTENT_TYPE}`]: HTTPHeaderValue.APPLICATION_JSON,
      [`${HTTPHeaderKey.AUTHORIZATION}`]: getAuthorziationValue(accessToken),
    },
    body: JSON.stringify(_menu),
  });
  // return response;

  //얘는 왜 return을 menuID를 하지...??
  const data = await response.json();
  return data;
};
