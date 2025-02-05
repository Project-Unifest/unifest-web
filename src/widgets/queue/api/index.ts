import { client } from "@/src/shared/api/client";
import { QueueGroup } from "@/src/shared/lib/types";

interface QueueResponse {
  code: string;
  message: string;
  data: QueueGroup[];
}

export const fetchGroups = async (boothId: string): Promise<QueueGroup[]> => {
  const response = await client
    .get(`waiting/${boothId}/all`)
    .json<QueueResponse>();
  return response.data;
};
