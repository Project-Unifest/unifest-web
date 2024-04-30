"use client";

import { useBoothStore } from "@/src/shared/model/provider/booth-store-provider";
import { Button } from "@/src/shared/ui/Button";
import DotIcon from "@/src/shared/ui/DotIcon";
import RedDotIcon from "@/src/shared/ui/RedDotIcon";
import { Input } from "@/src/shared/ui/input";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Link from "next/link";
import React, { ChangeEvent, useState } from "react";

export function SetName() {
  const [nameInput, setNameInput] = useState("");
  const [parent] = useAutoAnimate();
  const editName = useBoothStore((state) => state.editName);
  const name = useBoothStore((state) => state.name);

  const handleNameInputChange = (event: ChangeEvent<HTMLInputElement>) =>
    editName(event.target.value);

  return (
    <>
      <div className="space-y-[143px]">
        <div className="flex flex-col items-center justify-start space-y-3">
          <h2 className="text-lg font-semibold">부스 이름을 입력해주세요</h2>
          <p className="text-xs font-medium text-gray">
            이후 부스 편집을 통해 언제든 수정 가능합니다.
          </p>
        </div>
        <div className="space-y-[6px]">
          <Input
            className="rounded-none border-0 border-b text-center shadow-none"
            type="text"
            placeholder="부스 이름을 입력해주세요"
            value={name}
            onChange={handleNameInputChange}
          />
          <div className="flex items-start justify-end">
            <div className="text-[10px] font-medium text-gray">0/30자</div>
          </div>
        </div>
      </div>
      <div
        className="sticky bottom-0 mt-auto  flex w-full bg-white pb-4 pt-4"
        ref={parent}
      >
        {name && (
          <Button
            className="w-full rounded-[10px] bg-pink py-3 text-white hover:bg-pink"
            asChild
          >
            <Link href="/add-booth/set-category">입력완료</Link>
          </Button>
        )}
      </div>
    </>
  );
}
