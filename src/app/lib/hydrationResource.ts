// hydrationResource.ts
let hydrated = false;
let resolve: (() => void) | null = null;

const promise = new Promise<void>((r) => {
  resolve = r;
});

export function markHydrated() {
  hydrated = true;
  if (resolve) resolve();
}

export function waitForHydration(hydrated: boolean) {
  if (hydrated) return;
  throw promise;
}
