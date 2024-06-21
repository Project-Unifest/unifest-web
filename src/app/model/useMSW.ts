import { useEffect, useState } from "react";

async function enableMocking() {
  // early return doesn't work
  if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    const { worker } = await import("@/mocks/browser");

    await worker.start();
  }
}

export default function useMSW() {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const mockEffect = async () => {
      await enableMocking();
      setLoading(false);
    };

    mockEffect();
  }, []);

  return isLoading;
}
