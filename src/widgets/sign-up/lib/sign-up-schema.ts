import { getMessage } from "@/src/shared/model/zod";
import { z } from "zod";

export enum University {
  Konkuk = "건국대학교",
  Transportation = "한국교통대학교",
  Korea = "고려대학교",
  SangMyung = "상명대학교",
  Gacheon = "가천대학교"
}

export const signUpSchema = z
  .object({
    university: z.nativeEnum(University, {
      errorMap: () => getMessage("학교를 선택해주세요"),
    }),
    email: z.string().email(getMessage("올바른 이메일이 아닙니다")),
    password: z
      .string()
      .min(8, getMessage("비밀번호는 8자 이상이 되어야 합니다"))
      .max(19, getMessage("비밀번호는 20자 미만이 되어야 합니다")),
    passwordCheck: z.string(),
    contact: z
      .string()
      .startsWith("010")
      .regex(
        /^010([0-9]{8})$/,
        getMessage("전화번호는 숫자만 입력하셔야 합니다"),
      ),
    personalInfoConsent: z
      .boolean()
      .refine((val) => val === true, getMessage("약관에 동의하셔야 합니다")),
  })
  .refine(({ password, passwordCheck }) => password === passwordCheck, {
    message: "비밀번호와 비밀번호 확인이 서로 다릅니다",
    path: ["passwordCheck"],
  });
