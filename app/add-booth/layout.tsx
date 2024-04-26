"use client";

import RedDotIcon from "@/src/shared/ui/RedDotIcon";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { DotIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export enum AnimatedPathSegment {
  SET_NAME = "set-name",
  SET_CATEGORY = "set-category",
  SET_DESCRIPTION = "set-description",
}

export default function AddBoothLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const [colorIds, setColorIds] = useState(["red0", "gray0", "gray1"]);
  const [parent] = useAutoAnimate();
  const pathname = usePathname()!;
  const colorIds =
    (pathname.includes(AnimatedPathSegment.SET_NAME) && [
      "red0",
      "gray0",
      "gray1",
    ]) ||
    (pathname.includes(AnimatedPathSegment.SET_CATEGORY) && [
      "gray1",
      "red0",
      "gray0",
    ]) ||
    (pathname.includes(AnimatedPathSegment.SET_DESCRIPTION) && [
      "gray0",
      "gray1",
      "red0",
    ]) ||
    [];

  // const colorIdsRef = useRef(colorIds);
  // colorIdsRef.current = colorIds;
  // const change = () => {
  //   const juggled = [...colorIds];
  //   juggled.unshift(juggled.pop()!);
  //   setColorIds(juggled);
  // };

  return (
    <>
      <div className="mx-auto mb-[46px] w-[80px]">
        <div
          ref={parent}
          className="flex h-[15px] w-[70px] items-center justify-between"
        >
          {colorIds.map((colorId) =>
            colorId.includes("red") ? (
              <RedDotIcon key={colorId} />
            ) : (
              <DotIcon key={colorId} />
            ),
          )}
        </div>
      </div>
      {children}
    </>
  );
}
