import { client } from "@/src/shared/api/client";
import { ApiResponse } from "@/src/shared/api/types";
import { MenuStatus } from "../lib/types";

interface MenuStatusResponse {
  id: number;
  status: MenuStatus;
}

export const updateMenuStatus = async (
  menuId: number,
  menuStatus: MenuStatus,
): Promise<ApiResponse<MenuStatusResponse>> => {
  return client
    .put(`api/menus/${menuId}/status`, {
      json: { menuStatus },
    })
    .json<ApiResponse<MenuStatusResponse>>();
};
