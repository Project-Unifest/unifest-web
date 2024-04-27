"use client";

import { AnimatedPathSegment } from "@/app/add-booth/layout";
import { Button } from "@/src/shared/ui/Button";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

enum HeaderlessPathSegment {
  SET_POSITION = "set-position",
}

enum TextlessPathSegment {
  SET_NAME = "set-name",
  SET_CATEGORY = "set-category",
  SET_DESCRIPTION = "set-description",
}

export function Header() {
  const router = useRouter();
  const pathname = usePathname()!;

  const isHeaderless = Object.values(HeaderlessPathSegment).some((segment) =>
    pathname.includes(segment),
  );

  const isTextless = Object.values(TextlessPathSegment).some((segment) =>
    pathname.includes(segment),
  );

  if (isHeaderless) {
    return <div />;
  }

  if (isTextless) {
    return (
      <div className="px-5">
        <button
          type="button"
          aria-label="back"
          className="p-4"
          onClick={() => router.back()}
        >
          <ChevronLeftIcon />
        </button>
      </div>
    );
  }

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
