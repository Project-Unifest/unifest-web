"use client";

import { Button } from "@/src/shared/ui/Button";
import { Input } from "@/src/shared/ui/input";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Link from "next/link";
import React, { useState } from "react";
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
import { useRouter } from "next/navigation";
import { signIn } from "../api/sign-in";
import { useAuthStore } from "@/src/shared/model/provider/auth-store-provider";

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

  const onSubmit = async (data: any) => {
    const credentials = await signIn(data);
    setCredentials(credentials);
    router.push("/");
  };

  return (
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
                      type="email"
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
          {form.formState.isValid && (
            <Button
              className="mt-4 w-full rounded-[10px] bg-pink py-3 text-white hover:bg-pink"
              type="submit"
            >
              로그인
            </Button>
          )}
        </form>
      </Form>

      <div className="mt-3">
        <Link href="./sign-up">가입하기</Link>
      </div>
    </div>
  );
}
