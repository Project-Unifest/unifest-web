import { API_URL } from "./../../../shared/api/config";
import { Booth, BoothList } from "@/src/shared/lib/types";

export const getBoothList = async () => {
  const response = await fetch(`${API_URL}/api/booths`);
  console.log(process.env.API_URL);
  console.log(API_URL);
  const data = (await response.json()) as {
    data: Pick<Booth, "id" | "name" | "description" | "location" | "enabled">[];
  };
  return data;
};
