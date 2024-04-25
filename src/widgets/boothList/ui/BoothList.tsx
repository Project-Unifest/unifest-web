import { AddBoothButton } from "@/src/features/add-booth";
import { Button } from "@/src/shared/ui/Button";
import React from "react";

export function BoothList() {
  return (
    <div className="flex flex-auto flex-col items-center justify-center">
      <h2 className="text-lg font-semibold">운영중인 부스 없음</h2>
      <p className="text-gray text-xs font-medium">
        부스를 추가하고 대기 손님들을 관리하세요
      </p>
      <AddBoothButton />
    </div>
  );
}
