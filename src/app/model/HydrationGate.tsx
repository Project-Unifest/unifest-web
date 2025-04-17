import React, { ReactNode } from "react";
import { waitForHydration } from "../lib/hydrationResource";
import { useHydration } from "./useHydration";

interface HydrationGateProps {
  children: ReactNode;
}

export function HydrationGate({ children }: HydrationGateProps) {
  // TODO: use Suspense Fallback instead of isLoading prop
  // const hydrated = useHydration();
  // waitForHydration(hydrated);

  return <>{children}</>;
}
