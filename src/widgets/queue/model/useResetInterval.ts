import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useState,
} from "react";

import useDebounce from "./useDebounce";

export default function useResetInterval(
  scheduleInterval: () => number,
  cancelInterval: (intervalId: number) => void,
  intervalIdRef: MutableRefObject<number | undefined>,
  delay: number,
) {
  const [shouldResetInterval, setShouldResetInterval] =
    useState<boolean>(false);
  const debouncedShouldResetInterval = useDebounce(shouldResetInterval, delay);

  useEffect(() => {
    if (intervalIdRef.current && debouncedShouldResetInterval) {
      window.clearInterval(intervalIdRef.current);
      const intervalId = scheduleInterval();
      intervalIdRef.current = intervalId;
      setShouldResetInterval(false);
    }

    return () => {
      if (intervalIdRef.current) {
        cancelInterval(intervalIdRef.current);
      }
    };
  }, [
    scheduleInterval,
    cancelInterval,
    debouncedShouldResetInterval,
    intervalIdRef,
  ]);

  const resetInterval = useCallback(() => {
    setShouldResetInterval(true);
  }, []);

  return resetInterval;
}
