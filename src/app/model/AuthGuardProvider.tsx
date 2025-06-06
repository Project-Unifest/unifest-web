"use client";

import React, { ReactNode, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import useAuthQuery from "./useAuthQuery";
import GlobalLoadingFallback from "../ui/global-loading-fallback";

interface AuthGuardProviderProps {
  children: ReactNode;
}

export default function AuthGuardProvider({
  children,
}: AuthGuardProviderProps) {
  const { data, isLoading } = useAuthQuery();
  const { isAuthenticated } = data;
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const redirect = pathname ?? "/";
    if (!isAuthenticated && redirect !== "/sign-in") {
      router.push(`/sign-in?redirect=${encodeURIComponent(redirect)}`);
    }
  }, [isAuthenticated, pathname, router]);

  if (isLoading) {
    return <GlobalLoadingFallback />;
  }

  return <>{children}</>;
}
