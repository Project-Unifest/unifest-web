export interface Product {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
}

export interface Booth {
  id?: number;
  name: string;
  category: string;
  description?: string;
  detail?: string;
  thumbnail: string;
  warning?: string;
  location: string;
  latitude: number;
  longitude: number;
  menus?: Product[];
  enabled?: boolean;
}

export interface Member {
  email: string;
  phoneNum: string;
  booths: Booth[];
  schoolId: number;
}

export enum BoothCategory {
  BAR = "BAR",
  FOOD = "FOOD",
  EVENT = "EVENT",
  NORMAL = "NORMAL",
  MEDICAL = "MEDICAL",
  TOILET = "TOILET",
}

export type BoothList = Booth[];
