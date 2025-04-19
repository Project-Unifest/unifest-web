import { useMutation } from "@tanstack/react-query";
import { client } from "@/src/shared/api/client";
import { ApiResponse } from "@/src/shared/api/types";

// Types
export interface MegaphoneRequest {
  boothId: number;
  msgBody: string;
}

const makeMegaphone = async (
  boothId: number,
  msg: { msgBody: string },
): Promise<ApiResponse<void>> => {
  return client
    .post("megaphone", {
      json: {
        ...msg,
        boothId,
      },
    })
    .json<ApiResponse<void>>();
};

export const useMakeMegaphoneMutation = () => {
  return useMutation({
    mutationFn: ({ boothId, msgBody }: MegaphoneRequest) =>
      makeMegaphone(boothId, { msgBody }),
  });
};
