import { client } from "@/src/shared/api/client";

export const cancelGroup = async (waitingId: string) => {
  return client.put(`waiting/${waitingId}/noshow`).json();
};
