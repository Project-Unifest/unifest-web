import { BoothCategory } from "@/src/shared/lib/types";
import { getMessage } from "@/src/shared/model/zod";
import { z } from "zod";

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
});
