"use client";

import { BoothEditBox } from "@/src/widgets/booth";
import React from "react";
import { useParams } from "next/navigation";

export default function EditBoothPage() {
  const { id: idStr } = useParams<{ id: string }>()!;
  const id = Number(idStr);

  return (
    <>
      <BoothEditBox boothId={Number(id)} />
    </>
  );
}
