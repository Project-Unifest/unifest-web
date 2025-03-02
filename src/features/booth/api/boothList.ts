import { API_URL } from "@/src/shared/api/config";
import { ApiResponse } from "@/src/shared/api/types";
import { Booth } from "@/src/shared/lib/types";

export const getBoothList = async () => {
  const response = await fetch(`${API_URL}/api/booths`);
  return response.json() as Promise<ApiResponse<Booth[]>>;
};
