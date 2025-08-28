import { MenuStatus } from "@/src/features/menu/lib/types";
import { z } from "zod";
import { getMessage } from "../../model/zod";

export const MenuItemSchema = z.object({
  id: z.number().optional(),
  menuStatus: z.enum(["ENOUGH", "UNDER_50", "UNDER_10", "SOLD_OUT"]),
  name: z
    .string()
    .min(1, getMessage("제목을 입력해주세요"))
    .max(50, getMessage("최대 50자까지 입력 가능합니다"))
    .trim(),
  price: z.number(),
  imgUrl: z.string().optional().nullable(),
  isDraft: z.boolean().optional(),
});

export type MenuItem = z.infer<typeof MenuItemSchema>;
