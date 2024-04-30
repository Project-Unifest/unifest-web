import { Button } from "@/src/shared/ui/Button";
import TrashCanIcon from "@/src/shared/ui/TrashCanIcon";
import React from "react";

export function DeleteButton() {
  return (
    <Button className="flex-1 rounded-xl border-[#d2d2d2] bg-white text-pink hover:bg-white">
      <TrashCanIcon />
      부스 삭제하기
    </Button>
  );
}
