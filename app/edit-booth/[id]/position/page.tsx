import { EditMap } from "@/src/widgets/booth/ui/EditMap";
import React from "react";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  return <EditMap boothId={id} />;
}
