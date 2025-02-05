import { client } from "@/src/shared/api/client";

export const fetchPIN = async (boothId: number) => {
  return client.get(`waiting/pin/${boothId}`).json();
};
