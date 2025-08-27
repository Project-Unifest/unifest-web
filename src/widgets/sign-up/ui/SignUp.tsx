"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/shared/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { University, signUpSchema } from "../lib/sign-up-schema";
import { Input } from "@/src/shared/ui/input";
import { Button } from "@/src/shared/ui/button";
import { z } from "zod";
import { Checkbox } from "@/src/shared/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/shared/ui/select";
import { signUp, useSignUp } from "@/src/features/auth/model/auth";
import { useRouter } from "next/navigation";
import { HTTPError } from "ky";

export function SignUp() {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordCheck: "",
      contact: "010",
      personalInfoConsent: false,
    },
  });

  const { isSubmitting, isSubmitSuccessful } = form.formState;

  const router = useRouter();

  const { mutateAsync: signUp } = useSignUp();

  const onSubmit = async (data: any) => {
    console.log(data);

    try {
      const { data: signUpResult } = await signUp(data);
      alert("회원가입에 성공했습니다.");
      router.push("/sign-in");
    } catch (e: any) {
      //TODO : Alert로 임시 처리, 나중에 수정
      if (e instanceof HTTPError && e.response.status === 400) {
        const errorData = await e.response.json();
        alert(errorData.message || "잘못된 요청입니다.");
      }
    }
  };

  return (
    <div className="relative overflow-visible">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="university"
            render={({ field }) => (
              <FormItem data-testid={"form-item-university"}>
                <FormLabel>학교 선택</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="학교" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                  <SelectItem value={University.Gacheon}>
                      {University.Gacheon}
                    </SelectItem>
                    {/* <SelectItem value={University.Korea}>
                      {University.Korea}
                    </SelectItem>
                    <SelectItem value={University.SangMyung}>
                      {University.SangMyung}
                    </SelectItem>
                    <SelectItem value={University.Transportation}>
                      {University.Transportation}
                    </SelectItem>
                    <SelectItem value={University.Konkuk}>
                      {University.Konkuk}
                    </SelectItem> */}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>이메일</FormLabel>
                <FormControl>
                  <Input placeholder="이메일" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호</FormLabel>
                <FormControl>
                  <Input
                    placeholder="비밀번호를 입력해주세요"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordCheck"
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호 확인</FormLabel>
                <FormControl>
                  <Input
                    placeholder="비밀번호 확인"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>전화번호</FormLabel>
                <FormControl>
                  <Input placeholder="전화번호를 입력해주세요" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="personalInfoConsent"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>
                    <a
                      href="https://abiding-hexagon-faa.notion.site/bb387c20f4c348d7a992d121692f2c8d?pvs=4"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      개인정보 수집 및 이용 약관
                    </a>
                    을 읽고 전체 동의합니다.
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting || isSubmitSuccessful}>회원가입</Button>
        </form>
      </Form>
    </div>
  );
}
