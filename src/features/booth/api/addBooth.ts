import { client } from "@/src/shared/api/client";
import { Booth, BoothCategoryKeys } from "@/src/shared/lib/types";
import { ApiResponse } from "@/src/shared/api/types";
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
export const addBooth = async (booth: Booth): Promise<ApiResponse<number>> => {
  const { id, ...boothWithoutId } = booth as BoothForCreate;
  boothWithoutId.menus.forEach((item) => {
    delete item.menuStatus;
    delete item.id;
  });
  //너무 쌉 하드코딩임..
  boothWithoutId.festivalId = FESTIVAL_ID;

  return client
    .post("api/booths", {
      json: boothWithoutId,
    })
    .json<ApiResponse<number>>();
};
