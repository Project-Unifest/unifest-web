import { Megaphone } from "@/src/widgets/megaphone/ui/Megaphone/Megaphone";
import React from "react";
export default function MegaphonePage({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <>
      <Megaphone boothId={Number(id)} />
    </>
  );
}
