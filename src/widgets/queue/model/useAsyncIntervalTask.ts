import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

export default function useIntervalAsyncTask<T, U extends unknown[]>(
  task: (...args: U) => Promise<T>,
  delay: number,
  ...dependencies: U
) {
  console.log("hi2");
  const [payload, setPayload] = useState<T | undefined>();

  const runTask = useCallback(async () => {
    const data = await task(...dependencies);
    setPayload(data);
  }, [task, dependencies]);

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
