import { Button } from "@/src/shared/ui/button";
import { Input } from "@/src/shared/ui/input";
import React from "react";

export function EditMenuBox() {
  return (
    <div>
      EditTextBox
      <Input type="file" />
      <Input placeholder="메뉴 이름" />
      <Input placeholder="가격" type="number" />
      <Button>메뉴 추가하기</Button>
    </div>
  );
}
