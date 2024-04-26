"use client";

import { Textarea } from "@/src/shared/ui/textarea";
import React, { ChangeEvent, useState } from "react";

export function SetDescription() {
  const [descriptionInput, setDescriptionInput] = useState<string>("");

  const hanldeDescriptionInputChange = (
    event: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    // TODO filter description input
    setDescriptionInput(event.target.value);
  };

  console.log(descriptionInput);

  return (
    <>
      <div className="mb-16  flex flex-col items-center justify-start space-y-3">
        <h2 className="text-lg font-semibold">부스 간단 소개를 입력해주세요</h2>
        <p className="text-xs font-normal text-[#848484]">
          이후 부스 편집을 통해 언제는 수정 가능합니다.
        </p>
      </div>
      <Textarea
        value={descriptionInput}
        onChange={hanldeDescriptionInputChange}
        placeholder="부스 컨텐츠, 판매 음식 등 자유롭게 부스를 소개해보세요."
        className="h-32 resize-none rounded-xl border border-[#D6D6D6] bg-[#FAFAFA] shadow-none placeholder:text-[#B0B0B0]"
      />
      <div className="mt-2 flex items-start justify-end">
        <div className="text-[10px] font-medium text-gray">0/100자</div>
      </div>
    </>
  );
}
