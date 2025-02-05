import { client } from "@/src/shared/api/client";

export const reissuePIN = async (boothId: number) => {
  return client.post(`waiting/pin/${boothId}`).json();
};
