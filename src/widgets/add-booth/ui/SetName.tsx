"use client";

import DotIcon from "@/src/shared/ui/DotIcon";
import RedDotIcon from "@/src/shared/ui/RedDotIcon";
import { Input } from "@/src/shared/ui/input";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import React, { useState } from "react";

export function SetName() {
  const [colorIds, setColorIds] = useState(["red0", "gray0", "gray1"]);
  const [parent] = useAutoAnimate();

  const change = () => {
    const juggled = [...colorIds];
    juggled.unshift(juggled.pop()!);
    setColorIds(juggled);
  };

  return (
    <>
      <div className="mx-auto mb-[46px] w-[80px]">
        <div
          ref={parent}
          className="flex h-[15px] w-[70px] items-center justify-between"
        >
          {colorIds.map((colorId) =>
            colorId.includes("red") ? (
              <RedDotIcon key={colorId} />
            ) : (
              <DotIcon key={colorId} />
            ),
          )}
        </div>
      </div>
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
          />
          <div className="flex items-start justify-end">
            <div className="text-[10px] font-medium text-gray">0/30자</div>
          </div>
        </div>
      </div>
    </>
  );
}
