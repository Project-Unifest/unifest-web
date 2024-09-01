"use client";

import React, { ReactNode, useEffect, useState } from "react";
import useMSW from "../model/useMSW";

export function MSWProvider({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  // const isMSWLoading = useMSW();

  // if (isMSWLoading) {
  //   return <></>;
  // }

  return <>{children}</>;
}
