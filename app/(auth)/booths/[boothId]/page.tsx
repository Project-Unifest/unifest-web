"use client";

import BoothDetail from "@/src/pages/booths/booth-detail";
import { useParams } from "next/navigation";
import { useGetMyProfile } from "@/src/entities/members/api";
export default function BoothDetailPage() {
  const { boothId: boothIdStr } = useParams<{ boothId: string }>()!;
  const boothId = Number(boothIdStr);

  const { data: myProfile } = useGetMyProfile();
  const booth = myProfile.booths.find((booth) => booth.id === boothId)!;

  return <BoothDetail booth={booth} />;
}
