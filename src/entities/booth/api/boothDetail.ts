import { BoothCategoryKeys, Product } from "@/src/shared/lib/types";
interface BoothScheduleResponse {
  id: number;
  date: string;
  openTime: string;
  closeTime: string;
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
  scheduleList: BoothScheduleResponse[];
  stampeEnabled: boolean;
}
