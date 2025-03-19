"use client";
import PINCard from "@/src/entities/queue/ui/PINCard";
import {
  useGetPinQuery,
  useReissuePINMutation,
} from "@/src/features/queue/api";
import RefreshButton from "@/src/features/queue/ui/refresh-button";
import React from "react";

interface PINContainerPropsType {
  boothId: number;
}

export default function PINContainer({ boothId }: PINContainerPropsType) {
  const { data: pinResponse, refetch: regetPIN } = useGetPinQuery(boothId);
  const { mutateAsync: reissuePIN, isPending: isReissuing } =
    useReissuePINMutation(boothId);

  const handleRefresh = async () => {
    await reissuePIN();
    regetPIN();
  };

  return (
    <PINCard
      PIN={pinResponse?.data || ""}
      slot={<RefreshButton onRefresh={handleRefresh} disabled={isReissuing} />}
    />
  );
}
