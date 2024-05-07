import { defineConfig, devices } from "@playwright/test";
import { PathParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
import path from "path";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require("dotenv").config({ path: path.resolve(__dirname, ".", ".env.local") });

const BASE_URL = process.env.BASE_URL;

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: `${BASE_URL}`,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },
  timeout: 5 * 60 * 1000,

  /* Configure projects for major browsers */
  projects: [
    { name: "setup", testMatch: /.*\.setup\.ts/ },

    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        storageState: "playwright/.auth/user.json", // use prepared auth state.
      },
      dependencies: ["setup"],
    },

    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        storageState: "playwright/.auth/user.json", // use prepared auth state.
      },
      dependencies: ["setup"],
    },

    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
        storageState: "playwright/.auth/user.json", // use prepared auth state.
      },
      dependencies: ["setup"],
    },

    /* Test against mobile viewports. */
    // {
    //   name: "Mobile Chrome",
    //   use: {
    //     ...devices["Pixel 5"],
    //     storageState: "playwright/.auth/user.json", // use prepared auth state.
    //   },
    //   dependencies: ["setup"],
    // },
    // {
    //   name: "Mobile Safari",
    //   use: {
    //     ...devices["iPhone 12"],
    //     storageState: "playwright/.auth/user.json", // use prepared auth state.
    //   },
    //   dependencies: ["setup"],
    // },

    /* Test against branded browsers. */
    // {
    //   name: "Microsoft Edge",
    //   use: {
    //     ...devices["Desktop Edge"],
    //     channel: "msedge",
    //     storageState: "playwright/.auth/user.json", // use prepared auth state.
    //   },
    //   dependencies: ["setup"],
    // },
    // {
    //   name: "Google Chrome",
    //   use: {
    //     ...devices["Desktop Chrome"],
    //     channel: "chrome",
    //     storageState: "playwright/.auth/user.json", // use prepared auth state.
    //   },
    //   dependencies: ["setup"],
    // },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: "yarn dev",
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
  },
});
