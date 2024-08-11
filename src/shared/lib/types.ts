import { MenuItemState } from "../model/store/booth-edit-store";

export interface Product {
  state: MenuItemState;
  id: number;
  name: string;
  price: number;
  imgUrl?: string;
}

export interface Booth {
  id?: number;
  name: string;
  category: BoothCategory;
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
  status: "RESERVED" | "CALLED" | "COMPLETED" | "CANCELED";
  waitingOrder: number;
}
