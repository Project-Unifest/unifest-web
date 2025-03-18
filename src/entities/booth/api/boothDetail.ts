import { client } from "@/src/shared/api/client";
import { Booth, BoothCategoryKeys, Product } from "@/src/shared/lib/types";
import { ApiResponse } from "@/src/shared/api/types";

interface LocalTime {
  hour: number;
  minute: number;
  second: number;
  nano: number;
}

interface BoothScheduleResponse {
  id: number;
  date: string;
  openTime: LocalTime;
  closeTime: LocalTime;
}

export interface BoothDetailResponse {
  id: number;
  name: string;
  category: BoothCategoryKeys;
  description: string;
  thumbnail: string;
  warning: string;
  location: string;
  latitude: number;
  longitude: number;
  menus: Product[];
  enabled: boolean;
  waitingEnabled: boolean;
  openTime: null | string;
  closeTime: null | string;
  scheduleList: BoothScheduleResponse[];
  stampeEnabled: boolean;
}

export const getBoothDetail = async (
  boothId: number,
): Promise<ApiResponse<BoothDetailResponse>> => {
  return client
    .get(`api/booths/${boothId}`, {
      cache: "no-store",
    })
    .json<ApiResponse<BoothDetailResponse>>();
};
