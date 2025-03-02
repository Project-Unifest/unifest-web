import { client } from "@/src/shared/api/client";
import { ApiResponse } from "@/src/shared/api/types";

export const makeMegaphone = async (
  boothId: number,
  msg: { msgBody: string },
): Promise<ApiResponse<void>> => {
  return client
    .post("megaphone", {
      json: {
        ...msg,
        boothId,
      },
    })
    .json<ApiResponse<void>>();
};
