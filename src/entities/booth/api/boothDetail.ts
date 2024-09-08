import { API_URL } from "@/src/shared/api/config";
import { Booth, BoothCategoryKeys, Product } from "@/src/shared/lib/types";

interface BoothDetailResponse {
  code: string;
  message: string;
  data: {
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
  };
}

export const getBoothDetail = async (
  boothId: number,
): Promise<BoothDetailResponse> => {
  const response = await fetch(`${API_URL}/api/booths/${boothId}`);
  const data = await response.json();
  return data;
};
