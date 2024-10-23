import { useCallback, useEffect, useState } from "react";

export default function useIntervalAsyncTask<T>(
  task: () => Promise<T>,
  delay: number,
) {
  const [payload, setPayload] = useState<T | undefined>();

  const runTask = useCallback(async () => {
    const data = await task();
    setPayload(data);
  }, [task]);

  const runIntervalTask = useCallback(() => {
    const intervalId = setInterval(runTask, delay);

    return intervalId;
  }, [delay, runTask]);

  useEffect(() => {
    const intervalId = runIntervalTask();

    return () => {
      clearInterval(intervalId);
    };
  }, [runIntervalTask]);

  return [payload, setPayload, runTask] as const;
}
