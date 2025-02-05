import { client } from "@/src/shared/api/client";
import { Booth } from "@/src/shared/lib/types";

export const getBoothList = async () => {
  return client.get("members/my").json<Booth[]>();
};
