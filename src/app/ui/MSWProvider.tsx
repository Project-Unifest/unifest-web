"use client";

import React, { ReactNode, useEffect, useState } from "react";
import useMSW from "../model/useMSW";

export function MSWProvider({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  useMSW();
  return <>{children}</>;
}
