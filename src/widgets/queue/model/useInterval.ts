import { useCallback, useEffect, useRef, useState } from "react";

export default function useInterval<T>(task: () => Promise<T>, delay: number) {
  const [payload, setPayload] = useState<T | undefined>();
  const intervalIdRef = useRef<number | undefined>();

  const load = useCallback(async () => {
    const data = await task();
    setPayload(data);
  }, [task]);

  const scheduleInterval = useCallback(() => {
    const intervalId = window.setInterval(load, delay);
    return intervalId;
  }, [delay, load]);

  const cancelInterval = useCallback((intervalId: number) => {
    window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    intervalIdRef.current = scheduleInterval();

    return () => {
      if (intervalIdRef.current) {
        window.clearInterval(intervalIdRef.current);
      }
    };
  }, [scheduleInterval]);

  return {
    payload,
    setPayload,
    load,
    intervalIdRef,
    scheduleInterval,
    cancelInterval,
  } as const;
}
