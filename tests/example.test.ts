import { Frame } from "@playwright/test";
import { test, expect } from "./test";
import { waitFor } from "@storybook/test";

let frame: Frame;

test.beforeEach(async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/example-page--logged-out"
  );
  await expect(page.getByTitle("storybook-preview-iframe")).toBeVisible();
  frame = page.frame({ url: /http:\/\/localhost:6006\/iframe.html/ })!;
  await expect(frame).not.toBeNull();
});

test("has logout button", async ({ page }) => {
  const loginButton = frame.getByRole("button", { name: /John/i }).first();
  await expect(loginButton).toBeVisible();
  await loginButton.click();

  await expect(
    frame.getByRole("button", {
      name: /John/i,
    })
  ).toBeVisible();
});

test("has mocking enabled", async ({ page }) => {
  await page.goto("http://localhost:6006/?path=/story/example-button--large");
  await expect(page.getByTitle("storybook-preview-iframe")).toBeVisible();
  frame = page.frame({ url: /http:\/\/localhost:6006\/iframe.html/ })!;
  await expect(frame).not.toBeNull();

  await expect(frame.getByText("John")).toBeVisible();
});
