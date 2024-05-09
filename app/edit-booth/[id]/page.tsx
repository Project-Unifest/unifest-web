import { BoothEditBox } from "@/src/widgets/booth";
import React from "react";
export default function EditBoothPage({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <>
      <BoothEditBox boothId={Number(id)} />
    </>
  );
}
