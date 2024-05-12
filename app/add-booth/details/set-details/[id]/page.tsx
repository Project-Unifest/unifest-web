"use client";

import { useBoothDetailsDraftStore } from "@/src/shared/model/provider/booth-details-draft-store-provider";
import { Add } from "@/src/widgets/booth";
import React from "react";

export default function Page({ params }: Readonly<{ params: { id: string } }>) {
  const { id } = params;
  return <Add boothId={Number(id)} />;
}
