"use client";

import { Label } from "@/src/shared/ui/label";
import { Switch } from "@/src/shared/ui/switch";
import React, { useState } from "react";
import { useUpdateBooth } from "../api";
import useBoothListStore from "@/src/shared/model/store/booth-list-store";

export function BoothAvailabilitySwitchButton({
  boothId,
  initialOpened,
}: Readonly<{ boothId: number; initialOpened?: boolean }>) {
  const [opened, setIsOpened] = useState<boolean>(Boolean(initialOpened));
  const booth = useBoothListStore((state) =>
    state.booths.filter((booth) => booth.id === boothId),
  )[0];
  const edit = useBoothListStore((state) => state.edit);
  const { mutate: updateBooth, isPending } = useUpdateBooth(boothId, {
    onUpdate: () => {
      edit({ ...booth, enabled: !opened });
      setIsOpened((currentOpened) => !currentOpened);
      edit({ ...booth, enabled: !opened });
    },
  });

  const toggleBoothOpened = async () => {
    updateBooth({
      enabled: !opened,
    });
  };

  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="booth-mode">영업</Label>
      <Switch
        id="booth-mode"
        checked={opened}
        onCheckedChange={toggleBoothOpened}
        color="primary"
        disabled={isPending}
      />
    </div>
  );
}
