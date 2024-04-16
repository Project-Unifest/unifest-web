import { test as base, expect, Frame } from "@playwright/test";
import { http } from "msw";
import type { MockServiceWorker } from "playwright-msw";
import { createWorkerFixture } from "playwright-msw";

import { helloHandler } from "@/mocks/api/hello";

const test = base.extend<{
  worker: MockServiceWorker;
  http: typeof http;
}>({
  worker: createWorkerFixture(helloHandler),
  http,
});

export { expect, test };
