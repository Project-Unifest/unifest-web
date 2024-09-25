import { API_URL } from "@/src/shared/api/config";
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
  const response = await fetch(`${API_URL}/api/booths/${boothId}`, {
    cache: "no-store",
  });
  const body = await response.json();
  console.log(body);
  return body;
};
