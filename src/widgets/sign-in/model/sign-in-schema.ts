import { getMessage } from "@/src/shared/model/zod";
import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email(getMessage("올바른 이메일이 아닙니다")),
  password: z.string().min(1),
});
