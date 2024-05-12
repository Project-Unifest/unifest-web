"use client";

import { AnimatedPathSegment } from "@/src/shared/lib/types";
import { Button } from "@/src/shared/ui/button";
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

enum SignInPathSegment {
  SIGN_IN = "sign-in",
}

// TODO change Header on sign-in and sign-on page

export function Header() {
  const router = useRouter();
  const pathname = usePathname()!;

  const isHeaderless = Object.values(HeaderlessPathSegment).some((segment) =>
    pathname.includes(segment),
  );

  const isTextless = Object.values(TextlessPathSegment).some((segment) =>
    pathname.includes(segment),
  );

  const headerText = Object.values(SignInPathSegment).some((segment) =>
    pathname.includes(segment),
  )
    ? "운영자/학생회 로그인"
    : "운영자모드";

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
              {/* TODO place icon on the left side */}
              <ChevronLeftIcon />
            </button>
          )}
        </div>
        <div className="shrink-0 font-black">{headerText}</div>
      </div>
    </header>
  );
}
