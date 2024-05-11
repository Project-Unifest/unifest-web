"use client";

import useAuthFetch from "@/src/shared/model/auth/useAuthFetchList";
import { Label } from "@/src/shared/ui/label";
import { Switch } from "@/src/shared/ui/switch";
import React, { useState } from "react";
import { updateBoothOpened } from "../api/booth";

export function SwitchButton({
  boothId,
  initialOpened,
}: Readonly<{ boothId: number; initialOpened?: boolean }>) {
  const [opened, setIsOpened] = useState<boolean>(false);

  const updateAuthBoothOpened = useAuthFetch(updateBoothOpened);

  const toggleBoothOpened = async () => {
    await updateAuthBoothOpened(boothId, !opened);
    setIsOpened((currentOpened) => !currentOpened);
  };

  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="booth-mode">영업</Label>
      <Switch
        id="booth-mode"
        checked={opened}
        onCheckedChange={toggleBoothOpened}
      />
    </div>
  );
}
