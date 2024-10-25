import React, { useEffect } from "react";
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

  useEffect(() => {
    if (shouldRunImmediately) {
      load();
      resetInterval();
    }
  }, [load, resetInterval, shouldRunImmediately]);

  return { load, resetInterval, ...intervalProps } as const;
}
