import {
  API_URL,
  getAuthorziationValue,
  HTTPHeaderKey,
  HTTPHeaderValue,
  HTTPMethod,
} from "@/src/shared/api/config";
import { Booth, BoothCategoryKeys } from "@/src/shared/lib/types";
import { MenuItemState } from "@/src/shared/model/store/booth-edit-store";
import { MenuStatus } from "../../menu/lib/types";

const FESTIVAL_ID = 2;
interface ProductForCreate {
  menuStatus?: MenuStatus;
  id?: number;
  name: string;
  price: number;
  imgUrl?: string;
}
interface BoothForCreate {
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
  menus: ProductForCreate[];
  enabled?: boolean;
  festivalId: number;
  openTime: null | string;
  closeTime: null | string;
}
// TODO add body
export const addBooth = async (accessToken: string, booth: Booth) => {
  const { id, ...boothWithoutId } = booth as BoothForCreate;
  boothWithoutId.menus.forEach((item) => {
    delete item.menuStatus;
    delete item.id;
  });
  //너무 쌉 하드코딩임..
  boothWithoutId.festivalId = FESTIVAL_ID;
  const response = await fetch(`${API_URL}/api/booths`, {
    method: HTTPMethod.POST,
    headers: {
      [`${HTTPHeaderKey.CONTENT_TYPE}`]: HTTPHeaderValue.APPLICATION_JSON,
      [`${HTTPHeaderKey.AUTHORIZATION}`]: getAuthorziationValue(accessToken),
    },
    body: JSON.stringify(boothWithoutId),
  });
  const data = await response.json();
  return data;
};
