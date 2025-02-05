import { client } from "@/src/shared/api/client";
import { Product } from "@/src/shared/lib/types";
import { MenuStatus } from "../lib/types";

interface ProductForFetch {
  name: string;
  price: number;
  imgUrl?: string;
  menuStatus: MenuStatus;
}

export const uploadMenuItem = async (
  boothId: number,
  menuItem: ProductForFetch,
) => {
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
    .json();
};

export const deleteMenuItem = async (menuId: number) => {
  return client.delete(`api/menus/${menuId}`).json();
};

export const editMenu = async (menuItem: Product) => {
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
    .json();
};
