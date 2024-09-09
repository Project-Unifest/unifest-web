import { Button } from "@/src/shared/ui/button";
import React from "react";

// TODO add handleClick event handler function

interface EnterButtonPropsType {
  onEnter: () => void | Promise<void>;
}

export default function EnterButton({ onEnter }: EnterButtonPropsType) {
  const handleClick = () => {
    onEnter();
  };
  return (
    <Button size="square" state="outlined" shape="circle" onClick={handleClick}>
      입장
    </Button>
  );
}
