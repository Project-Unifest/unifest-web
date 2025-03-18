import { BoothCategoryKeys, Product } from "@/src/shared/lib/types";
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
