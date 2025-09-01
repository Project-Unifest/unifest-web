import { getMessage } from "@/src/shared/model/zod";
import { z } from "zod";

export const signInSchema = z.object({
  email: z.string(),
  password: z
    .string()
    .min(8, getMessage("비밀번호는 8자 이상이 되어야 합니다"))
    .max(19, getMessage("비밀번호는 20자 미만이 되어야 합니다")),
});
