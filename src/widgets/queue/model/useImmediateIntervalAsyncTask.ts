import React, { useEffect } from "react";
import useIntervalAsyncTask from "./useAsyncIntervalTask";

export default function useImmediateIntervalAsyncTask<T, U extends unknown[]>(
  task: (...args: U) => Promise<T>,
  delay: number,
  shouldRunImmediately: boolean,
  ...dependencies: U
) {
  const [payload, setPayload, runTask] = useIntervalAsyncTask(
    task,
    delay,
    ...dependencies,
  );

  useEffect(() => {
    console.log(shouldRunImmediately);
    if (shouldRunImmediately) {
      console.log("asdfasfasdf");
      runTask();
    }
  }, [runTask, shouldRunImmediately]);

  return [payload, setPayload, runTask] as const;
}
