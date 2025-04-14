"use client";

import AuthGuardProvider from "@/src/app/model/AuthGuardProvider";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("AuthLayout");
  return <AuthGuardProvider>{children}</AuthGuardProvider>;
}
