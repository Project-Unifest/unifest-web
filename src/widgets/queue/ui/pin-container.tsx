"use client";
import { fetchPIN } from "@/src/entities/queue/model/pin";
import PINCard from "@/src/entities/queue/ui/PINCard";
import { reissuePIN } from "@/src/features/queue/api/pin";
import RefreshButton from "@/src/features/queue/ui/refresh-button";
import React, { useEffect, useState } from "react";

interface PINContainerPropsType {
  boothId: number;
}

export default function PINContainer({ boothId }: PINContainerPropsType) {
  const [PIN, setPIN] = useState<string>("");

  const handleRefresh = async () => {
    const newPIN = await reissuePIN(boothId);
    setPIN(newPIN);
  };

  useEffect(() => {
    const asyncEffect = async () => {
      const data = await fetchPIN(boothId);
      setPIN(data);
    };
    asyncEffect();
  }, [boothId]);

  return (
    <PINCard PIN={PIN} slot={<RefreshButton onRefresh={handleRefresh} />} />
  );
}
