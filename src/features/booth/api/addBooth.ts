import { API_URL, HTTPMethod } from "@/src/shared/api/config";
import { Booth } from "@/src/shared/lib/types";

// TODO add body
export const addBooth = async (booth: Booth) => {
  const response = await fetch(`${API_URL}/api/booths`, {
    method: HTTPMethod.POST,
  });
  const data = await response.json();
  return data;
};
