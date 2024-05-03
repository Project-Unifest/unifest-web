import { BoothItem } from "@/src/entities/booth";
import { getBoothList } from "@/src/entities/booth/api/boothList";
import { AddBoothButton } from "@/src/features/booth";
import { DeleteButton } from "@/src/features/booth/ui/DeleteButton";
import { EditButton } from "@/src/features/booth/ui/EditButton";
import { SwitchButton } from "@/src/features/booth/ui/SwitchButton";
import { Button } from "@/src/shared/ui/button";
import React from "react";

export async function BoothList() {
  const { data: boothList } = await getBoothList();

  if (!boothList?.length) {
    return (
      <div className="flex flex-auto flex-col items-center justify-center">
        <h2 className="text-lg font-semibold">운영중인 부스 없음</h2>
        <p className="text-xs font-medium text-gray">
          부스를 추가하고 대기 손님들을 관리하세요
        </p>
        <AddBoothButton />
      </div>
    );
  }

  return (
    <div className="my-4 space-y-2">
      {boothList.map((booth) => (
        <BoothItem
          key={booth.id}
          {...booth}
          editButton={<EditButton />}
          deleteButton={<DeleteButton />}
          switchButton={<SwitchButton />}
        />
      ))}
    </div>
  );
}
