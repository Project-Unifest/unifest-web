import { AddMap } from "@/src/widgets/booth";
import React from "react";

export default function Page({ params }: Readonly<{ params: { id: string } }>) {
  const { id } = params;
  return <AddMap boothId={Number(id)} />;
}
