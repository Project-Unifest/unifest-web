import { client } from "@/src/shared/api/client";
import { Booth } from "@/src/shared/lib/types";
import { ApiResponse } from "@/src/shared/api/types";

export const deleteBooth = async (id: string) => {
  return client.delete(`api/booths/${id}`).json<ApiResponse<void>>();
};

export const editBooth = async (
  booth: Omit<Booth, "enabled" | "menus" | "detail" | "description">,
) => {
  const { id, ...boothWithoutId } = booth;
  return client
    .patch(`api/booths/${id}`, {
      json: boothWithoutId,
    })
    .json<ApiResponse<Booth>>();
};

export const updateBoothOpened = async (
  boothId: number,
  opened: boolean,
  latitude: number,
  longitude: number,
) => {
  return client
    .patch(`api/booths/${boothId}`, {
      json: { enabled: opened },
    })
    .json<ApiResponse<Booth>>();
};

export const toggleBoothQueueFeature = async (
  boothId: number,
  isQueueFeatureEnabled: boolean,
) => {
  return client
    .patch(`api/booths/${boothId}`, {
      json: { waitingEnabled: isQueueFeatureEnabled },
    })
    .json<ApiResponse<Booth>>();
};
