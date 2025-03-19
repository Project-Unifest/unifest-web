import { client } from "@/src/shared/api/client";
import { ApiResponse } from "@/src/shared/api/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { BoothDetailResponse } from "../../booth/api/boothDetail";
import { createQueryKeys } from "@lukemorales/query-key-factory";

type MemberRole = "DEV" | "ADMIN" | "PENDING" | "VERIFIED" | "DENIED";

export interface MemberDetailResponse {
  id: number;
  email: string;
  booths: BoothDetailResponse[];
  schoolId: number;
  phoneNum: string;
  memberRole: MemberRole;
}

export const memberKeys = createQueryKeys("members", {
  me: null,
});

export const getMyProfile = async () => {
  return (
    await client.get("members/my").json<ApiResponse<MemberDetailResponse>>()
  ).data;
};

export const useGetMyProfile = () => {
  return useSuspenseQuery({
    queryKey: memberKeys.me.queryKey,
    queryFn: getMyProfile,
  });
};
