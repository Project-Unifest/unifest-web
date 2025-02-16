import { client } from "@/src/shared/api/client";
import { Booth } from "@/src/shared/lib/types";

export const addBooth = async (
  booth: Pick<
    Booth,
    "name" | "category" | "description" | "longitude" | "latitude"
  >,
) => {
  return client
    .post("api/booths", {
      json: booth,
    })
    .json();
};
