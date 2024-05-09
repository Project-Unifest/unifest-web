import { API_URL } from "@/src/shared/api/config";
import { Booth } from "@/src/shared/lib/types";

export const getBoothDetail = async (boothId: number) => {
  const response = await fetch(`${API_URL}/api/booths/${boothId}`);
  const data = await response.json();
  return data;
};
