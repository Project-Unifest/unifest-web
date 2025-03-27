import { API_URL } from "@/src/shared/api/config";
import {
  Booth,
  BoothCategoryKeys,
  BoothSchedule,
  Product,
} from "@/src/shared/lib/types";

export interface BoothDetail {
  id: number;
  name: string;
  category: BoothCategoryKeys;
  description: string;
  thumbnail: string;
  warning: string;
  location: string;
  latitude: number;
  longitude: number;
  menus: Product[];
  enabled: boolean;
  waitingEnabled: boolean;
  scheduleList: BoothSchedule[];
}

interface BoothDetailResponse {
  code: string;
  message: string;
  data: BoothDetail;
}

export const getBoothDetail = async (
  boothId: number,
): Promise<BoothDetailResponse> => {
  const response = await fetch(`${API_URL}/api/booths/${boothId}`, {
    cache: "no-store",
  });
  const body = await response.json();

  // 백엔드 API가 아직 scheduleList를 지원하지 않는 경우를 위한 처리
  if (body.data && "openTime" in body.data && "closeTime" in body.data) {
    const { openTime, closeTime, ...rest } = body.data;
    const today = new Date().toISOString().split("T")[0];

    // openTime과 closeTime이 모두 있는 경우에만 scheduleList에 추가
    body.data = {
      ...rest,
      scheduleList:
        openTime && closeTime
          ? [
              {
                date: today,
                openTime,
                closeTime,
              },
            ]
          : [],
    };
  }

  console.log(body);
  return body;
};
