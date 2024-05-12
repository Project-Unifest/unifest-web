"use client";

import { useBoothEditStore } from "@/src/shared/model/provider/booth-edit-store.provider";
import { useBoothListStore } from "@/src/shared/model/provider/booth-list-store-provider";
import { Button } from "@/src/shared/ui/button";
import PencilIcon from "@/src/shared/ui/PencilIcon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useReducer } from "react";

interface EditButtonPropsType {
  boothId: number;
}

export function EditButton({ boothId }: EditButtonPropsType) {
  const initialize = useBoothEditStore((state) => state.initialize);
  const booths = useBoothListStore((state) => state.booths);

  const router = useRouter();
  return (
    <Button
      className="flex-1 rounded-xl border-[#d2d2d2] bg-white text-[#2d2d2d] hover:bg-white"
      onClick={() => {
        const selectedBooth = booths.filter((booth) => booth.id === boothId)[0];
        initialize(selectedBooth);
        router.push(`/edit-booth/${boothId}/position`);
      }}
    >
      <PencilIcon />
      부스 편집하기
    </Button>
  );
}
