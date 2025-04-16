"use client";

import dynamic from "next/dynamic";

const BoothList = dynamic(
  () => import("@/src/widgets/boothList/ui/BoothList"),
  {
    ssr: false,
  },
);

export default function Home() {
  return <BoothList />;
}
