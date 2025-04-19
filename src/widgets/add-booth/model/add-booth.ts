import { client } from "@/src/shared/api/client";
import { Booth } from "@/src/shared/lib/types";
import { ApiResponse } from "@/src/shared/api/types";

export const addBooth = async (
  booth: Omit<
    Pick<Booth, "name" | "category" | "description" | "longitude" | "latitude">,
    "id"
  >,
): Promise<ApiResponse<number>> => {
  return client
    .post("api/booths", {
      json: booth,
    })
    .json<ApiResponse<number>>();
};
