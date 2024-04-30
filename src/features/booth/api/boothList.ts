import { API_URL } from "@/src/shared/api/config";

export const getBoothList = async () => {
  const response = await fetch(`${API_URL}/api/booths`);
  const data = response.json();
  return data;
};
