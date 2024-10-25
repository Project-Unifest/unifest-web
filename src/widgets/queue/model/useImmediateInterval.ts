import React, { useCallback, useEffect } from "react";
import useInterval from "./useInterval";
import useResetInterval from "./useResetInterval";

export default function useImmediateInterval<T>(
  task: () => Promise<T>,
  delay: number,
  shouldRunImmediately: boolean,
) {
  const {
    load,
    scheduleInterval,
    cancelInterval,
    intervalIdRef,
    ...intervalProps
  } = useInterval(task, delay);
  const resetInterval = useResetInterval(
    scheduleInterval,
    cancelInterval,
    intervalIdRef,
    delay,
  );

  const loadAndResetInterval = useCallback(() => {
    load();
    resetInterval();
  }, [load, resetInterval]);

  useEffect(() => {
    if (shouldRunImmediately) {
      loadAndResetInterval();
    }
  }, [loadAndResetInterval, shouldRunImmediately]);

  return { loadAndResetInterval, ...intervalProps } as const;
}
