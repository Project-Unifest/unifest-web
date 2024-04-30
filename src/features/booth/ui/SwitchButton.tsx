"use client";

import { Label } from "@/src/shared/ui/label";
import { Switch } from "@/src/shared/ui/switch";
import React, { useState } from "react";

export function SwitchButton() {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="booth-mode">영업</Label>
      <Switch
        id="booth-mode"
        checked={isOpened}
        onCheckedChange={() =>
          setIsOpened((currentIsOpened) => !currentIsOpened)
        }
      />
    </div>
  );
}
