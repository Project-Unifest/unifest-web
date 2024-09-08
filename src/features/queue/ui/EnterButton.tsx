import { Button } from "@/src/shared/ui/button";
import React from "react";

// TODO add handleClick event handler function

interface EnterButtonPropsType {
  id: number;
  onEnter: (id: number) => void | Promise<void>;
}

export default function Enter({ id, onEnter }: EnterButtonPropsType) {
  const handleClick = () => {
    onEnter(id);
  };
  return (
    <Button size="square" state="outlined" shape="circle" onClick={handleClick}>
      입장
    </Button>
  );
}
