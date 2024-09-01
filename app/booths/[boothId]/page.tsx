import { BoothItem } from "@/src/entities/booth";
import { DeleteButton } from "@/src/features/booth/ui/DeleteButton";
import { EditButton } from "@/src/features/booth/ui/EditButton";
import { SwitchButton } from "@/src/features/booth/ui/SwitchButton";
import BoothDetail from "@/src/pages/booths/booth-detail";
import { API_URL } from "@/src/shared/api/config";
import { Booth } from "@/src/shared/lib/types";
import React from "react";

export default async function BoothDetailPage({
  params,
}: {
  params: { boothId: string };
}) {
  const boothId = parseInt(params.boothId);

  const booth = await fetch(`${API_URL}/api/booths/${boothId}`)
    .then((response) => response.json())
    .then((data) => data.data);

  return <BoothDetail booth={booth} />;
}
