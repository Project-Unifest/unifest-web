import { useEffect, useState } from "react";

async function enableMocking() {
  // early return doesn't work
  if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    const { worker } = await import("@/mocks/browser");

    // `worker.start()` returns a Promise that resolves
    // once the Service Worker is up and ready to intercept requests.
    await worker.start();
  }
}

export default function useMSW() {
  useEffect(() => {
    enableMocking();
  }, []);
}
