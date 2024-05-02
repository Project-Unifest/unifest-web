import { Input } from "@/src/shared/ui/input";
import { Label } from "@/src/shared/ui/label";
import { Textarea } from "@/src/shared/ui/textarea";
import React from "react";

export function EditTextBox() {
  return (
    <div>
      <Input placeholder="주의사항 (예: 컴퓨터공학부만 출입 가능)" />
      <Input placeholder="부스 상세 위치 (예: 청심대 앞)" />
      <Label htmlFor="description">소개 글</Label>
      <Textarea id="description" placeholder="내용을 입력해주세요" />
    </div>
  );
}
