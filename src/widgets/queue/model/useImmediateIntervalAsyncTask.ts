import React, { useEffect } from "react";
import useIntervalAsyncTask from "./useAsyncIntervalTask";

export default function useImmediateIntervalAsyncTask<T>(
  task: () => Promise<T>,
  delay: number,
  shouldRunImmediately: boolean,
) {
  const [payload, setPayload, runTask] = useIntervalAsyncTask(task, delay);

  useEffect(() => {
    if (shouldRunImmediately) {
      runTask();
    }
  }, [runTask, shouldRunImmediately]);

  return [payload, setPayload, runTask] as const;
}
