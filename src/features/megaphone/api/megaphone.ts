import { client } from "@/src/shared/api/client";

export const makeMegaphone = async (
  boothId: number,
  msg: { msgBody: string },
) => {
  return client
    .post("megaphone", {
      json: {
        ...msg,
        boothId,
      },
    })
    .json();
};
