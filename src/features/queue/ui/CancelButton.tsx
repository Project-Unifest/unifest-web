import { Button } from "@/src/shared/ui/button";
import React from "react";

interface CancelButtonPropsType {
  id: number;
  onCancel: (id: number) => void | Promise<void>;
}

export default function CancelButton({ id, onCancel }: CancelButtonPropsType) {
  const handleClick = () => {
    onCancel(id);
  };

  return (
    <Button
      size="square"
      state="secondary"
      shape="circle"
      onClick={handleClick}
    >
      부재
    </Button>
  );
}
