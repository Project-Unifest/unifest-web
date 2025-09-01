"use client";

import { Button } from "@/src/shared/ui/button";
import { Input } from "@/src/shared/ui/input";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { signInSchema } from "../model/sign-in-schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/src/shared/ui/form";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "../api/sign-in";
import { useAuthStore } from "@/src/shared/model/store/auth-store";

export function SignIn() {
  const [parent] = useAutoAnimate();
  const setCredentials = useAuthStore((state) => state.setCredentials);
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams!.get("redirect");

  const onSubmit = async (data: any) => {
    const credentials = await signIn(data);
    setCredentials(credentials);
    router.push(redirect || "/");
  };

  return (
    <>
      <div ref={parent} className="mt-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* TODO remove black outline around input */}
            <div className="space-y-2">
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="아이디를 입력해주세요"
                        {...field}
                        className="outline-none focus:border-pink"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="비밀번호를 입력해주세요"
                        type="password"
                        {...field}
                        className="outline-none focus:border-pink"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              className="mt-4 w-full rounded-[10px] bg-pink py-3 text-white hover:bg-pink"
              type="submit"
            >
              로그인
            </Button>
          </form>
        </Form>

        <div className="mt-3">
          <Link href="./sign-up">가입하기</Link>
        </div>
      </div>
      <div className="sticky bottom-0 mt-auto flex w-full flex-col items-center justify-center pb-4 pt-4">
        <p className="text-xs font-medium text-[#848484]">
          운영자가 아닌 일반 사용자는 가입 없이 모든 기능을 이용할 수 있습니다.
        </p>
        <a
          href="http://pf.kakao.com/_KxaaDG/chat"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-[#494949] underline"
        >
          운영자 부스 관련 문의
        </a>
      </div>
    </>
  );
}
