"use client";

import useBoothDetailsDraftStore from "@/src/shared/model/store/booth-details-draft-store";
import { Add } from "@/src/widgets/booth";
import { useParams } from "next/navigation";
import React from "react";

export default function Page() {
  const params = useParams();
  const boothId = Number(params!.id);
  return <Add boothId={boothId} />;
}
