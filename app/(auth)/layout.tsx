"use client";

import AuthGuardProvider from "@/src/app/model/AuthGuardProvider";
import { usePathname } from "next/navigation";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuardProvider>{children}</AuthGuardProvider>;
}
