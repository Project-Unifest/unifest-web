"use client";
import { API_URL } from "@/src/shared/api/config";
import useAuthFetch from "@/src/shared/model/auth/useAuthFetchList";
import React, { ReactNode, useEffect, useState } from "react";
import { fetchPIN } from "../model/pin";
import { setDefaultAutoSelectFamilyAttemptTimeout } from "net";
import RefreshIcon from "@/src/shared/ui/RefreshIcon";

interface PINCardPropsType {
  slot?: ReactNode;
  PIN: string;
}

export default function PINCard({ slot, PIN }: PINCardPropsType) {
  return (
    <div className="relative flex flex-col items-center justify-center pb-16 pt-8">
      <div className="text-xl font-semibold">웨이팅 PIN</div>
      <div className="text-5xl font-bold">{PIN}</div>
      <div className="absolute bottom-4 right-8">{slot}</div>
    </div>
  );
}
