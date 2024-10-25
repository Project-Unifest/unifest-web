import React, { useEffect, useState } from "react";

export default function useDebounce<T>(value: T, delay?: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = window.setTimeout(
      () => setDebouncedValue(debouncedValue),
      delay || 1000,
    );

    return () => {
      window.clearTimeout(timer);
    };
  }, [debouncedValue, delay]);

  return debouncedValue;
}
