"use client";

import useBoothDetailsDraftStore from "@/src/shared/model/store/booth-details-draft-store";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import React from "react";

const Add = dynamic(
  () => import("@/src/widgets/booth").then((mod) => mod.Add),
  {
    ssr: false,
  },
);

export default function Page() {
  const params = useParams();
  const boothId = Number(params!.id);
  return <Add boothId={boothId} />;
}
