import { MenuItemState } from "../model/store/booth-edit-store";

export interface Product {
  menuStatus?: MenuItemState;
  id: number;
  name: string;
  price: number;
  imgUrl?: string;
}

export interface Booth {
  id?: number;
  name: string;
  category: BoothCategoryKeys;
  description?: string;
  detail?: string;
  thumbnail: string;
  warning?: string;
  location: string;
  latitude: number;
  longitude: number;
  menus: Product[];
  enabled?: boolean;
}

export interface Member {
  id?: number;
  email: string;
  phoneNum: string;
  booths: Booth[];
  schoolId: number;
  memberRole: string;
}

export const BoothCategory = {
  BAR: "BAR",
  FOOD: "FOOD",
  EVENT: "EVENT",
  NORMAL: "NORMAL",
  TOILET: "TOILET",
  MEDICAL: "MEDICAL",
} as const;

export type BoothCategoryKeys =
  (typeof BoothCategory)[keyof typeof BoothCategory];

export type BoothList = Booth[];
export interface MenuItem {
  id: number;
  name: string;
  price: number;
  imgUrl?: string;
  state: MenuItemState;
}
export enum AnimatedPathSegment {
  SET_NAME = "set-name",
  SET_CATEGORY = "set-category",
  SET_DESCRIPTION = "set-description",
}

export interface QueueGroup {
  boothId: number;
  waitingId: number;
  partySize: number;
  tel: string;
  deviceId: string;
  createdAt: string;
  updatedAt: string;
  status: "RESERVED" | "CALLED" | "COMPLETED" | "CANCELED" | "NOSHOW";
  waitingOrder: number;
}
