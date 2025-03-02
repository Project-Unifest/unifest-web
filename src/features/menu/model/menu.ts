import { client } from "@/src/shared/api/client";
import { Product } from "@/src/shared/lib/types";
import { MenuStatus } from "../lib/types";
import { ApiResponse } from "@/src/shared/api/types";

interface ProductForFetch {
  name: string;
  price: number;
  imgUrl?: string;
  menuStatus: MenuStatus;
}

export const uploadMenuItem = async (
  boothId: number,
  menuItem: ProductForFetch,
): Promise<ApiResponse<number>> => {
  const _menu: ProductForFetch = {
    name: menuItem.name,
    price: menuItem.price,
    imgUrl: menuItem.imgUrl,
    menuStatus: menuItem.menuStatus,
  };

  return client
    .post(`api/menus/${boothId}`, {
      json: _menu,
    })
    .json<ApiResponse<number>>();
};

export const deleteMenuItem = async (
  menuId: number,
): Promise<ApiResponse<void>> => {
  return client.delete(`api/menus/${menuId}`).json<ApiResponse<void>>();
};

export const editMenu = async (
  menuItem: Product,
): Promise<ApiResponse<void>> => {
  const _menu: ProductForFetch = {
    name: menuItem.name,
    price: menuItem.price,
    imgUrl: menuItem.imgUrl,
    menuStatus: menuItem.menuStatus,
  };

  return client
    .patch(`api/menus/${menuItem.id}`, {
      json: _menu,
    })
    .json<ApiResponse<void>>();
};
