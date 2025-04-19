"use client";

import useBoothEditStore from "@/src/shared/model/store/booth-edit-store";
import { Button } from "@/src/shared/ui/button";
import PencilIcon from "@/src/shared/ui/PencilIcon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useReducer } from "react";
import { useGetMyProfile } from "@/src/entities/members/api";

interface EditButtonPropsType {
  boothId: number;
}

export function EditButton({ boothId }: EditButtonPropsType) {
  const { data: profile } = useGetMyProfile();
  const booth = profile?.booths.find((booth) => booth.id === boothId)!;
  const initialize = useBoothEditStore((state) => state.initialize);
  initialize(booth as any);
  const router = useRouter();
  return (
    <Button
      className="z-20 flex-1 rounded-xl border border-[#d2d2d2] bg-white text-[#2d2d2d] hover:bg-white"
      onClick={() => {
        initialize(booth as any);
        router.push(`/edit-booth/${boothId}/position`);
      }}
    >
      <PencilIcon />
      부스 편집하기
    </Button>
  );
}
