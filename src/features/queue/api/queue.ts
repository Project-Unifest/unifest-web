import { client } from "@/src/shared/api/client";

interface QueueResponse {
  code: string;
  message: string;
  data: any;
}

export const cancelGroup = async (
  waitingId: string,
): Promise<QueueResponse> => {
  return client.put(`waiting/${waitingId}/noshow`).json<QueueResponse>();
};

export const callGroup = async (waitingId: string): Promise<QueueResponse> => {
  return client.put(`waiting/${waitingId}/call`).json<QueueResponse>();
};

export const completeGroup = async (
  waitingId: string,
): Promise<QueueResponse> => {
  return client.put(`waiting/${waitingId}/complete`).json<QueueResponse>();
};
