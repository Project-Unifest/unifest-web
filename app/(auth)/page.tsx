"use client";

import BoothList from "@/src/widgets/boothList/ui/BoothList";
import dynamic from "next/dynamic";

// const BoothList = dynamic(
// () => import("@/src/widgets/boothList/ui/BoothList"),
// {
//   ssr: false,
// },
// );

export default function Home() {
  console.log("Home");
  return <BoothList />;
}
