import { Input } from "@/src/shared/ui/input";
import { Label } from "@/src/shared/ui/label";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import React from "react";

export function EditImageBox() {
  return (
    <>
      <Label
        htmlFor="booth-image"
        className="flex h-60 w-full cursor-pointer items-center justify-center bg-[#C0C1C3]"
      >
        <div>
          <PlusCircledIcon className="h-6 w-6 text-[#4b4b4b]" />
          <span className="sr-only">부스 이미지 선택하기</span>
        </div>
        <Input
          type="file"
          className="sr-only"
          accept="image/*"
          id="booth-image"
        />
      </Label>
    </>
  );
}
