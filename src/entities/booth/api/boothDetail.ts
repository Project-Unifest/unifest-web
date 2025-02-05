import { client } from "@/src/shared/api/client";
import { Booth, BoothCategoryKeys, Product } from "@/src/shared/lib/types";

export interface BoothDetail {
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
}

interface BoothDetailResponse {
  code: string;
  message: string;
  data: BoothDetail;
}

export const getBoothDetail = async (
  boothId: number,
): Promise<BoothDetailResponse> => {
  return client
    .get(`api/booths/${boothId}`, {
      cache: "no-store",
    })
    .json<BoothDetailResponse>();
};
