"use client";

import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();

  console.log(router);
  console.log(pathname);

  return (
    <header>
      <div className="relative flex items-center justify-center rounded-b-3xl pb-6 pt-5 shadow-lg">
        <div className="relative">
          {pathname !== "/" && (
            <button type="button" onClick={() => router.back()}>
              <ChevronLeftIcon />
            </button>
          )}
        </div>
        <div className="shrink-0 font-black">운영자모드</div>
      </div>
    </header>
  );
}
