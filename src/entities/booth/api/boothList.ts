import { client } from "@/src/shared/api/client";
import { Booth } from "@/src/shared/lib/types";
import { ApiResponse } from "@/src/shared/api/types";
import { useSuspenseQuery } from "@tanstack/react-query";

export const getBoothList = async () => {
  return (await client.get("members/my").json<ApiResponse<Booth[]>>()).data;
};

export const useGetBoothList = () => {
  return useSuspenseQuery({
    queryKey: ["boothList"],
    queryFn: getBoothList,
  });
};
