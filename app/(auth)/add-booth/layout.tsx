"use client";

import { AnimatedPathSegment } from "@/src/shared/lib/types";
import RedDotIcon from "@/src/shared/ui/RedDotIcon";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { DotIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";

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

  // if (
  //   !Object.values(AnimatedPathSegment).some((segment) =>
  //     pathname.includes(segment),
  //   )
  // ) {
  // }

  // TODO Wrap children with <Form /> element and send data through server action.
  // FIXME remove padding when there is no progress component

  return (
    <>
      <div className={`mx-auto w-[80px] ${colorIds.length && `mb-[46px]`}`}>
        <div
          ref={parent}
          className={`flex  w-[70px] items-center justify-between ${colorIds.length && `h-[15px]`}`}
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
