import { client } from "@/src/shared/api/client";
import { MenuStatus } from "../lib/types";

interface MenuStatusResponse {
  id: number;
  status: MenuStatus;
}

export const updateMenuStatus = async (
  menuId: number,
  menuStatus: MenuStatus,
) => {
  return client
    .put(`api/menus/${menuId}/status`, {
      json: { menuStatus },
    })
    .json<MenuStatusResponse>();
};
