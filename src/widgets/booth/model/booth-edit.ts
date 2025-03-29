import { BoothCategory } from "@/src/shared/lib/types";
import { getMessage } from "@/src/shared/model/zod";
import { z } from "zod";

// "HH:mm:ss" 형식을 위한 정규식 (00:00:00 ~ 23:59:59 범위)
const timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;

// 부스 일정 스키마
const scheduleSchema = z
  .object({
    date: z.string(),
    openTime: z
      .string()
      .regex(timeRegex, getMessage("시간은 HH:mm:ss 형식이어야 합니다")),
    closeTime: z
      .string()
      .regex(timeRegex, getMessage("시간은 HH:mm:ss 형식이어야 합니다")),
  })
  .refine(
    (schedule) => {
      // 둘 다 설정되지 않았거나 비어있으면 검증 통과 (다른 refine에서 처리)
      if (
        !schedule.openTime ||
        !schedule.closeTime ||
        schedule.openTime === "" ||
        schedule.closeTime === ""
      ) {
        return true;
      }

      // 시간 검증 로직 디버깅
      console.log(
        `Validating time: ${schedule.date}, open: ${schedule.openTime}, close: ${schedule.closeTime}`,
      );
      console.log(
        `Time comparison result: ${schedule.openTime < schedule.closeTime}`,
      );

      // 시작 시간과 종료 시간 비교
      return schedule.openTime < schedule.closeTime;
    },
    {
      message: "시작 시간은 종료 시간보다 빨라야 합니다",
      path: ["closeTime"], // 종료 시간에 오류 표시
    },
  );

export const boothEditSchema = z.object({
  category: z.nativeEnum(BoothCategory, getMessage("올바른 선택지가 아닙니다")),
  name: z.string().min(1, getMessage("제목을 입력해주세요")),
  // thumbnail: z.string().url(),
  warning: z.string(),
  location: z.string(),
  description: z
    .string()
    .max(100, getMessage("최대 100자까지 입력 가능합니다")),
  latitude: z.number(),
  longitude: z.number(),
  scheduleList: z.array(scheduleSchema).refine(
    (schedules) => {
      // scheduleList가 비어있어도 괜찮음 (필수 아님)
      if (schedules.length === 0) return true;

      // 모든 일정에 시간이 설정되어 있는지 확인
      return schedules.every(
        (schedule) => schedule.openTime && schedule.closeTime,
      );
    },
    {
      message: "모든 운영일의 시작 시간과 종료 시간을 입력해주세요",
    },
  ),
});
