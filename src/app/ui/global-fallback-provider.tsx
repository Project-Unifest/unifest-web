import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import GlobalLoadingFallback from "./global-loading-fallback";
import { GlobalErrorFallback } from "./global-error-fallback";

interface GlobalFallbackProviderProps {
  children: React.ReactNode;
}

export default function GlobalFallbackProvider({
  children,
}: GlobalFallbackProviderProps) {
  return (
    <ErrorBoundary FallbackComponent={GlobalErrorFallback}>
      <Suspense fallback={<GlobalLoadingFallback />}>{children}</Suspense>
    </ErrorBoundary>
  );
}
