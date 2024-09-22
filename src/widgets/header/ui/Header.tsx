"use client";

import { AnimatedPathSegment } from "@/src/shared/lib/types";
import useRequireAuth from "@/src/shared/model/auth/useRequireAuth";
import { useAuthStore } from "@/src/shared/model/provider/auth-store-provider";
import LogoutIcon from "@/src/shared/ui/LogoutIcon";
import SpeakerIcon from "@/src/shared/ui/SpeakerIcon";
import { Button } from "@/src/shared/ui/button";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
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

enum MegaphonePathSegment {
  MEGAPHONE = "megaphone",
}

enum BoothDetailPathSegment {
  booths = "booths",
}

// TODO change Header on sign-in and sign-on page

const getBoothId = (pathname: string) => {
  const boothId = pathname.split("/booths/")[1];
  return boothId;
};

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
    : Object.values(MegaphonePathSegment).some((segment) =>
          pathname.includes(segment),
        )
      ? "확성기"
      : "운영자모드";

  const [accessToken, reset] = useAuthStore((state) => [
    state.accessToken,
    state.reset,
  ]);
  const isLoggedIn = Boolean(accessToken);

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
        {pathname !== "/" && (
          <button
            type="button"
            onClick={() => router.back()}
            className="absolute left-4"
          >
            {/* TODO place icon on the left side */}
            <ChevronLeftIcon />
          </button>
        )}

        <div className="shrink-0 font-black">{headerText}</div>
        {pathname.includes(BoothDetailPathSegment.booths) && (
          <Link
            href={`/megaphone/${getBoothId(pathname)}`}
            className="absolute right-4"
          >
            <SpeakerIcon />
          </Link>
        )}
        {!pathname.includes(BoothDetailPathSegment.booths) && isLoggedIn && (
          <button
            type="button"
            onClick={() => {
              reset();
              router.replace("/sign-in");
            }}
            className="absolute right-4"
          >
            <LogoutIcon />
          </button>
        )}
      </div>
    </header>
  );
}
