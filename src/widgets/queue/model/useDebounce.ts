import React, { useCallback, useEffect } from "react";

export default function useDebounce<T extends unknown[]>(
  task: (...args: T) => Promise<void>,
  delay: number,
  dependencies: T,
) {
  useEffect(() => {
    const handler = setTimeout(() => {
      task(...dependencies);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [delay, dependencies, task]);
}
