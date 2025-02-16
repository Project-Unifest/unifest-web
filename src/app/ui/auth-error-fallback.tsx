"use client";

import { ErrorBoundary, FallbackProps } from "react-error-boundary";

import { useRouter } from "next/navigation";
import { useAuthStore } from "../../shared/model/provider/auth-store-provider";
import { ReactNode, useEffect } from "react";
import { HTTPError } from "ky";

function AuthErrorFallback({ error }: FallbackProps) {
  const router = useRouter();
  const { signOut } = useAuthStore();

  useEffect(() => {
    if (error instanceof HTTPError) {
      signOut();
      router.push("/sign-in");
    }
  }, [error, router, signOut]);

  return null;
}

interface AuthErrorBoundaryProps {
  children: ReactNode;
}

export function AuthErrorBoundaryWithRouter({
  children,
}: AuthErrorBoundaryProps) {
  return (
    <ErrorBoundary FallbackComponent={AuthErrorFallback}>
      {children}
    </ErrorBoundary>
  );
}
