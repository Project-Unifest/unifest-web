import { client } from "@/src/shared/api/client";
import { ApiResponse } from "@/src/shared/api/types";

export const fetchPIN = async (
  boothId: number,
): Promise<ApiResponse<string>> => {
  return client.get(`waiting/pin/${boothId}`).json<ApiResponse<string>>();
};
