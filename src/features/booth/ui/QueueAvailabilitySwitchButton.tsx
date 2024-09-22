"use client";

import useAuthFetch from "@/src/shared/model/auth/useAuthFetchList";
import { Label } from "@/src/shared/ui/label";
import { Switch } from "@/src/shared/ui/switch";
import React, { useState } from "react";
import { toggleBoothQueueFeature } from "../api/booth";
import { useBoothListStore } from "@/src/shared/model/provider/booth-list-store-provider";
import { useRouter } from "next/navigation";

export function QueueAvailabilitySwitchButton({
  boothId,
  initialOpened,
}: Readonly<{ boothId: number; initialOpened?: boolean }>) {
  const router = useRouter();
  const [isQueueAvailable, setIsQueueAvailable] = useState<boolean>(
    Boolean(initialOpened),
  );
  const booth = useBoothListStore((state) =>
    state.booths.filter((booth) => booth.id === boothId),
  )[0];
  const edit = useBoothListStore((state) => state.edit);

  const toggleAuthBoothQueueFeature = useAuthFetch(toggleBoothQueueFeature);

  const toggleBoothOpened = async () => {
    await toggleAuthBoothQueueFeature(boothId, !isQueueAvailable);
    setIsQueueAvailable((currentOpened) => !currentOpened);
    edit({ ...booth, waitingEnabled: !isQueueAvailable });
    router.refresh();
  };

  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="queue-availability">웨이팅 기능</Label>
      <Switch
        id="queue-availability"
        checked={isQueueAvailable}
        onCheckedChange={toggleBoothOpened}
        color="secondary"
      />
    </div>
  );
}
