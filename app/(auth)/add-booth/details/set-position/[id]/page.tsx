"use client";

import { AddMap } from "@/src/widgets/booth";
import { useParams } from "next/navigation";
import React from "react";

export default function Page() {
  const params = useParams();
  const boothId = Number(params!.id);
  return <AddMap boothId={boothId} />;
}
