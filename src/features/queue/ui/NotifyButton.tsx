import { Button } from "@/src/shared/ui/button";
import React from "react";

interface NotifyButtonPropsType {
  onNotify: () => void | Promise<void>;
}

export default function NotifyButton({ onNotify }: NotifyButtonPropsType) {
  const handleClick = () => {
    onNotify();
  };

  return (
    <Button size="square" state="filled" shape="circle" onClick={handleClick}>
      호출
    </Button>
  );
}
