import { useAuthStore } from "@/src/shared/model/store/auth-store";
import { startTransition, useState } from "react";

import { useEffect } from "react";
import { markHydrated } from "../lib/hydrationResource";

export function useHydration() {
  const [hydrated, setHydrated] = useState(false);
  console.log("hydrated", hydrated);

  useEffect(() => {
    const unsubHydrate = useAuthStore.persist.onHydrate(() =>
      setHydrated(false),
    );
    const unsubFinishHydration = useAuthStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });

    if (useAuthStore.persist.hasHydrated?.()) {
      setHydrated(useAuthStore.persist.hasHydrated?.() ?? false);
      markHydrated();
    }

    return () => {
      unsubHydrate();
      unsubFinishHydration();
    };
  }, []);

  return hydrated;
}
