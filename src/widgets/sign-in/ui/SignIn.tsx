"use client";

import { Button } from "@/src/shared/ui/Button";
import { Input } from "@/src/shared/ui/input";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Link from "next/link";
import React, { useState } from "react";

export function SignIn() {
  const [parent] = useAutoAnimate();

  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  console.log(id);
  console.log(password);

  return (
    <div ref={parent} className="mt-10">
      <div className="space-y-2">
        {/* TODO remove black outline around input */}
        <Input
          placeholder="아이디를 입력해주세요"
          type="email"
          value={id}
          onChange={(event) => setId(event.target.value)}
          className="outline-none focus:border-pink"
        />
        <Input
          placeholder="비밀번호를 입력해주세요"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="focus:border-pink"
        />
      </div>
      {id && password && (
        <Button className="mt-4 w-full rounded-[10px] bg-pink py-3 text-white hover:bg-pink">
          로그인
        </Button>
      )}

      <div className="mt-3">
        <Link href="./sign-up">가입하기</Link>
      </div>
    </div>
  );
}
