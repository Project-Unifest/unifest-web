import { Frame } from "@playwright/test";
import { test, expect } from "./test";
import { waitFor } from "@storybook/test";

let frame: Frame;

test.beforeEach(async ({ page }) => {
  // await page.goto(
  //   "http://localhost:6006/?path=/story/example-page--logged-out",
  // );
  // await expect(page.getByTitle("storybook-preview-iframe")).toBeVisible();
  // frame = page.frame({ url: /http:\/\/localhost:6006\/iframe.html/ })!;
  // await expect(frame).not.toBeNull();
});

test("has logout button", async ({ page }) => {
  // await page.goto(
  //   "http://localhost:6006/?path=/story/example-page--logged-out",
  // );
  // await expect(page.getByTitle("storybook-preview-iframe")).toBeVisible();
  // const frame = page.frame({ url: /http:\/\/localhost:6006\/iframe.html/ })!;
  // await expect(frame).not.toBeNull();
  // const button = frame.getByRole("button", { name: /John/i }).first();
  // await expect(button).toBeVisible();
  // await button.click();
  // await expect(
  //   frame.getByRole("button", {
  //     name: /John/i,
  //   }),
  // ).toBeVisible();
});

test("has mocking enabled", async ({ page }) => {
  // await page.goto("http://localhost:6006/?path=/story/example-button--large");
  // await expect(page.getByTitle("storybook-preview-iframe")).toBeVisible();
  // frame = page.frame({ url: /http:\/\/localhost:6006\/iframe.html/ })!;
  // await expect(frame).not.toBeNull();
  // await expect(frame.getByText("John")).toBeVisible();
});
