import { Input } from "@/src/shared/ui/input";
import React from "react";

export function SetName() {
  return (
    <div className="space-y-[143px]">
      <div className="flex flex-col items-center justify-start space-y-3">
        <h2 className="text-lg font-semibold">부스 이름을 입력해주세요</h2>
        <p className="text-gray text-xs font-medium">
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
          <div className="text-gray text-[10px] font-medium">0/30자</div>
        </div>
      </div>
    </div>
  );
}
