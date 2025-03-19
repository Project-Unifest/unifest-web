"use client";

import { Label } from "@/src/shared/ui/label";
import { Switch } from "@/src/shared/ui/switch";
import { useState } from "react";
import { useToggleQueue } from "../api";
import useBoothListStore from "@/src/shared/model/store/booth-list-store";

export function QueueAvailabilitySwitchButton({
  boothId,
  initialEnabled,
}: Readonly<{ boothId: number; initialEnabled?: boolean }>) {
  const [enabled, setEnabled] = useState<boolean>(Boolean(initialEnabled));
  const booth = useBoothListStore((state) =>
    state.booths.filter((booth) => booth.id === boothId),
  )[0];
  const edit = useBoothListStore((state) => state.edit);
  const { mutate: toggleQueue, isPending } = useToggleQueue(boothId, {
    onToggle: () => {
      setEnabled((current) => !current);
      edit({ ...booth, waitingEnabled: !enabled });
    },
  });

  const handleCheckedChange = async () => {
    toggleQueue(!enabled);
  };

  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="queue-availability">웨이팅 기능</Label>
      <Switch
        id="queue-availability"
        checked={enabled}
        onCheckedChange={handleCheckedChange}
        color="secondary"
        disabled={isPending}
      />
    </div>
  );
}
