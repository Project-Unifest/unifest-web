import { client } from "@/src/shared/api/client";
import { QueueGroup } from "@/src/shared/lib/types";
import { ApiResponse } from "@/src/shared/api/types";

export const fetchGroups = async (boothId: string): Promise<QueueGroup[]> => {
  const { data } = await client
    .get(`waiting/${boothId}/all`)
    .json<ApiResponse<QueueGroup[]>>();
  return data;
};
