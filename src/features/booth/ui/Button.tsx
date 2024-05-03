import { Button as BaseButton } from "@/src/shared/ui/button";
import Link from "next/link";
import React from "react";

export function Button() {
  return (
    <BaseButton
      type="button"
      className="mt-6 rounded-xl border border-[#D2D2D2] bg-white px-9 py-2 text-sm font-medium text-black hover:bg-white"
    >
      <Link href="/add-booth/select-mode">부스/주점 등록하기</Link>
    </BaseButton>
  );
}
