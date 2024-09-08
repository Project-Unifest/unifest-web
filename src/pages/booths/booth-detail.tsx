import { BoothItem } from "@/src/entities/booth";
import { DeleteButton } from "@/src/features/booth/ui/DeleteButton";
import { EditButton } from "@/src/features/booth/ui/EditButton";
import { SwitchButton } from "@/src/features/booth/ui/SwitchButton";
import { Booth } from "@/src/shared/lib/types";
import { Separator } from "@/src/shared/ui/separator";
import Queue from "@/src/widgets/queue/ui";
import PINContainer from "@/src/widgets/queue/ui/pin-container";
import React from "react";

interface BoothDetailPropsType {
  booth: Booth;
}

export default function BoothDetail({ booth }: BoothDetailPropsType) {
  return (
    <>
      <div className="mb-3">
        <BoothItem
          key={booth.id}
          {...booth}
          editButton={<EditButton boothId={booth.id!} />}
          deleteButton={<DeleteButton boothId={booth.id!} />}
          switchButton={
            <SwitchButton boothId={booth.id!} initialOpened={booth.enabled} />
          }
        />
      </div>
      <Separator className="h-2 bg-slate-100" />
      <PINContainer boothId={booth.id!} />
      <Separator className="h-2 bg-slate-100" />
      <Queue />
    </>
  );
}
