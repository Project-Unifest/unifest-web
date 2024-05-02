import { getMessage } from "@/src/shared/model/zod";
import { z } from "zod";

export const boothEditSchema = z.object({
  thumbnail: z.string().url(getMessage("올바른 URL이 아닙니다")),
  category: z.enum(
    ["bar", "food", "event", "more"],
    getMessage("올바른 선택지가 아닙니다"),
  ),
  name: z.string().min(1, getMessage("제목을 입력해주세요")),
  warning: z.string(),
  location: z.string(),
  description: z.string().max(100, getMessage("최대 20자까지 입력 가능합니다")),
  latitude: z.number(),
  longitude: z.number(),
  menu: z.array(
    z.object({
      name: z.string().min(1, getMessage("이름을 입력해주세요")),
      price: z.number().int(getMessage("가격은 정수여야 합니다")),
    }),
  ),
});
