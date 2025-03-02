import { client } from "@/src/shared/api/client";
import { ApiResponse } from "@/src/shared/api/types";

export const reissuePIN = async (
  boothId: number,
): Promise<ApiResponse<string>> => {
  return client.post(`waiting/pin/${boothId}`).json<ApiResponse<string>>();
};
