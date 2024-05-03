import { Button } from "@/src/shared/ui/button";
import PencilIcon from "@/src/shared/ui/PencilIcon";
import Link from "next/link";
import React from "react";

export function EditButton() {
  return (
    <Button
      className="flex-1 rounded-xl border-[#d2d2d2] bg-white text-[#2d2d2d] hover:bg-white"
      asChild
    >
      <Link href="/edit-booth">
        <PencilIcon />
        부스 편집하기
      </Link>
    </Button>
  );
}
