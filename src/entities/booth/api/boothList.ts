import { client } from "@/src/shared/api/client";
import { Booth } from "@/src/shared/lib/types";
import { ApiResponse } from "@/src/shared/api/types";

export const getBoothList = async () => {
  return client.get("members/my").json<ApiResponse<Booth[]>>();
};
