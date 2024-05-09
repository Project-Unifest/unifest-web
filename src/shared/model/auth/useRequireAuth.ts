import React, { useEffect, useState } from "react";
import { useAuthStore } from "../provider/auth-store-provider";
import { useRouter } from "next/navigation";

export enum AuthType {
  GUEST = "guest",
  MEMBER = "member",
}

export default function useRequireAuth(requiredAuthType: AuthType) {
  const [accessToken, refreshToken, isHydrated] = useAuthStore((state) => [
    state.accessToken,
    state.refreshToken,
    state.isHydrated,
  ]);

  const isLoading = !isHydrated;

  const currentAuthType = (accessToken && AuthType.MEMBER) || AuthType.GUEST;
  const router = useRouter();

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    if (
      requiredAuthType === AuthType.MEMBER &&
      requiredAuthType !== currentAuthType
    ) {
      router.push("/sign-in");
    }
    if (
      requiredAuthType === AuthType.GUEST &&
      requiredAuthType !== currentAuthType
    ) {
      router.push("/");
    }
  }, [router, currentAuthType, requiredAuthType, isHydrated]);

  return isLoading;
}
