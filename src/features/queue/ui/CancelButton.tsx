import { Button } from "@/src/shared/ui/button";
import React from "react";

interface CancelButtonPropsType {
  
  onCancel: () => void | Promise<void>;
}

export default function CancelButton({ onCancel }: CancelButtonPropsType) {
  const handleClick = () => {
    onCancel();
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
