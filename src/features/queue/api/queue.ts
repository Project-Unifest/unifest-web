import { client } from "@/src/shared/api/client";
import { ApiResponse } from "@/src/shared/api/types";

export const cancelGroup = async (
  waitingId: string,
): Promise<ApiResponse<void>> => {
  return client.put(`waiting/${waitingId}/noshow`).json<ApiResponse<void>>();
};

export const callGroup = async (
  waitingId: string,
): Promise<ApiResponse<void>> => {
  return client.put(`waiting/${waitingId}/call`).json<ApiResponse<void>>();
};

export const completeGroup = async (
  waitingId: string,
): Promise<ApiResponse<void>> => {
  return client.put(`waiting/${waitingId}/complete`).json<ApiResponse<void>>();
};
