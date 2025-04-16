import { useMutation } from "@tanstack/react-query";
import { client } from "@/src/shared/api/client";
import { ApiResponse } from "@/src/shared/api/types";
import { MenuStatus } from "../lib/types";
import { Product } from "@/src/shared/lib/types";
import { createQueryKeys } from "@lukemorales/query-key-factory";

export interface MenuStatusRequest {
  menuId: number;
  menuStatus: MenuStatus;
}

export interface MenuStatusResponse {
  id: number;
  status: MenuStatus;
}

export interface MenuItemRequest {
  name: string;
  price: number;
  imgUrl?: string;
  menuStatus: MenuStatus;
}

export interface MenuPatchRequest {
  name: string;
  price: number;
  imgUrl?: string;
  menuStatus?: MenuStatus;
}

const updateMenuStatus = async (
  menuId: number,
  menuStatus: MenuStatus,
): Promise<ApiResponse<MenuStatusResponse>> => {
  return client
    .put(`api/menus/${menuId}/status`, {
      json: { menuStatus },
    })
    .json<ApiResponse<MenuStatusResponse>>();
};

const createMenuItem = async (
  boothId: number,
  menuItem: MenuItemRequest,
): Promise<ApiResponse<number>> => {
  return client
    .post(`api/menus/${boothId}`, {
      json: menuItem,
    })
    .json<ApiResponse<number>>();
};

const updateMenuItem = async (
  menuId: number,
  menuData: MenuPatchRequest,
): Promise<ApiResponse<void>> => {
  return client
    .patch(`api/menus/${menuId}`, {
      json: menuData,
    })
    .json<ApiResponse<void>>();
};

const deleteMenuItem = async (menuId: number): Promise<ApiResponse<void>> => {
  return client.delete(`api/menus/${menuId}`).json<ApiResponse<void>>();
};

export const useUpdateMenuStatus = () => {
  return useMutation({
    mutationFn: ({ menuId, menuStatus }: MenuStatusRequest) =>
      updateMenuStatus(menuId, menuStatus),
  });
};

export const useCreateMenuItem = (
  boothId: number,
  options?: { onCreate?: () => void },
) => {
  return useMutation({
    mutationFn: (menuItem: MenuItemRequest) =>
      createMenuItem(boothId, menuItem),
    onSuccess: () => {
      options?.onCreate?.();
    },
  });
};

export const useUpdateMenuItem = (options?: { onUpdate?: () => void }) => {
  return useMutation({
    mutationFn: ({
      menuId,
      menuData,
    }: {
      menuId: number;
      menuData: MenuPatchRequest;
    }) => updateMenuItem(menuId, menuData),
    onSuccess: () => {
      options?.onUpdate?.();
    },
  });
};

export const useDeleteMenuItem = (options?: { onDelete?: () => void }) => {
  return useMutation({
    mutationFn: (menuId: number) => deleteMenuItem(menuId),
    onSuccess: () => {
      options?.onDelete?.();
    },
  });
};
