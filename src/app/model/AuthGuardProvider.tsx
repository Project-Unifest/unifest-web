"use client";

import React, { ReactNode, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import useAuthQuery from "./useAuthQuery";

interface AuthGuardProviderProps {
  children: ReactNode;
}

export default function AuthGuardProvider({
  children,
}: AuthGuardProviderProps) {
  const { data } = useAuthQuery();
  const { isAuthenticated } = data;
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const redirect = pathname ?? "/";
    if (!isAuthenticated && redirect !== "/sign-in") {
      router.push(`/sign-in?redirect=${encodeURIComponent(redirect)}`);
    }
  }, [isAuthenticated, pathname, router]);

  return <>{children}</>;
}
