import { Button } from "@/src/shared/ui/button";
import React from "react";

interface NotifyButtonPropsType {
  id: number;
  onNotify: (waitingId: number) => void | Promise<void>;
}

export default function NotifyButton({ id, onNotify }: NotifyButtonPropsType) {
  const handleClick = () => {
    onNotify(id);
  };

  return (
    <Button size="square" state="filled" shape="circle" onClick={handleClick}>
      호출
    </Button>
  );
}
