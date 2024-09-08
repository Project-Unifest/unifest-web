import { BoothItem } from "@/src/entities/booth";
import { DeleteButton } from "@/src/features/booth/ui/DeleteButton";
import { EditButton } from "@/src/features/booth/ui/EditButton";
import { SwitchButton } from "@/src/features/booth/ui/SwitchButton";
import BoothDetail from "@/src/pages/booths/booth-detail";
import { API_URL } from "@/src/shared/api/config";
import { Booth, BoothCategoryKeys, Product } from "@/src/shared/lib/types";
import React from "react";

interface BoothDetailResponse {
  id: number;
  name: string;
  category: BoothCategoryKeys;
  description: string;
  thumbnail: string;
  warning: string;
  location: string;
  latitude: number;
  longitude: number;
  menus: Product[];
  enabled: boolean;
  waitingEnabled: boolean;
  openTime: null | string;
  closeTime: null | string;
}

export default async function BoothDetailPage({
  params,
}: {
  params: { boothId: string };
}) {
  const boothId = parseInt(params.boothId);

  const booth = (await fetch(`${API_URL}/api/booths/${boothId}`)
    .then((response) => response.json())
    .then((data) => data.data)) as BoothDetailResponse;

  return <BoothDetail booth={booth} />;
}
