"use client";
import { fetchPIN } from "@/src/entities/queue/model/pin";
import PINCard from "@/src/entities/queue/ui/PINCard";
import { reissuePIN } from "@/src/features/queue/api/pin";
import RefreshButton from "@/src/features/queue/ui/refresh-button";
import useAuthFetch from "@/src/shared/model/auth/useAuthFetchList";
import React, { useEffect, useState } from "react";

interface PINContainerPropsType {
  boothId: number;
}

export default function PINContainer({ boothId }: PINContainerPropsType) {
  const [PIN, setPIN] = useState<string>("");
  const reissueAuthPIN = useAuthFetch(reissuePIN);

  const fetchAuthPIN = useAuthFetch(fetchPIN);

  const handleRefresh = async () => {
    const newPIN = await reissueAuthPIN(boothId);
    setPIN(newPIN);
  };

  useEffect(() => {
    const asyncEffect = async () => {
      const data = await fetchAuthPIN(boothId);
      console.log(data);
      setPIN(data);
    };
    asyncEffect();
  }, [boothId, fetchAuthPIN]);

  return (
    <PINCard PIN={PIN} slot={<RefreshButton onRefresh={handleRefresh} />} />
  );
}
