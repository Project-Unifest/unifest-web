import { client } from "@/src/shared/api/client";
import { ApiResponse } from "@/src/shared/api/types";
import { createQueryKeys } from "@lukemorales/query-key-factory";
import { useSuspenseQuery } from "@tanstack/react-query";

interface FestivalResponse {
  festivalId: number;
  schoolId: number;
  thumbnail: string;
  schoolName: string;
  region: string;
  festivalName: string;
  beginDate: string;
  endDate: string;
  latitude: number;
  longitude: number;
}

const getFestivals = async (): Promise<FestivalResponse[]> => {
  return (
    await client.get("festival/all").json<ApiResponse<FestivalResponse[]>>()
  ).data;
};

const festivalKeys = createQueryKeys("festivals", {
  list: null,
});
export const useFestivalListQuery = () => {
  return useSuspenseQuery({
    queryKey: festivalKeys.list.queryKey,
    queryFn: getFestivals,
  });
};
