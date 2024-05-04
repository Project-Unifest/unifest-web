"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "../provider/auth-store-provider";
import React, { useCallback, useEffect, useMemo } from "react";
import { restoreAccessToken } from "@/src/features/auth/model/auth";
import {
  HTTPHeaderKey,
  HTTPHeaderValue,
  getAccessToken,
  getAuthorziationValue,
} from "../../api/config";

type FetchFunc = (accessToken: string, ...params: any[]) => Promise<any>;

export default function useAuthFetch(fetchFunc: FetchFunc) {
  const [accessToken, refreshToken, refresh, reset] = useAuthStore((state) => [
    state.accessToken,
    state.refreshToken,
    state.refresh,
    state.reset,
  ]);
  const router = useRouter();

  const authFetchFunc = useCallback(
    async (...params: any[]): Promise<any> => {
      const { code: originalCode, data: originalData } = await fetchFunc(
        accessToken,
        ...params,
      );

      if (originalCode !== 2000) {
        return originalData;
      }

      const restoredResponse = await restoreAccessToken(refreshToken);
      const { headers: restoredHeaders } = restoredResponse;

      if (!restoredResponse.ok) {
        const { code: restoredCode } = await restoredResponse.json();
        if (restoredCode === 2003) {
          reset();
          router.push("/");
        }
      }

      const authorization = restoredHeaders.get(HTTPHeaderKey.AUTHORIZATION)!;
      const reissuedAccessToken = getAccessToken(authorization);
      refresh(reissuedAccessToken);

      return await fetchFunc(reissuedAccessToken, ...params);
    },
    [accessToken, fetchFunc, refresh, refreshToken, reset, router],
  );

  return authFetchFunc;
}
