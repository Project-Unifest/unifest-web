import { Frame } from "@playwright/test";
import { test, expect } from "./test";
import { waitFor } from "@storybook/test";

let frame: Frame;

test.beforeEach(async ({ page }) => {
  // await page.goto(
  //   "http://localhost:6006/?path=/story/example-page--logged-out",
  // );
  page.goto(
    "http://localhost:6006/?path=/story/widgets-auth-signupform--default",
  );
  await expect(page.getByTitle("storybook-preview-iframe")).toBeVisible();
  frame = page.frame({ url: /http:\/\/localhost:6006\/iframe.html/ })!;
  await expect(frame).not.toBeNull();
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

test("abcdefg", async ({ page }) => {
  const combobox = frame.getByRole("combobox", { name: "학교 선택" });
  expect(combobox).toBeVisible();

  await combobox.click();
  const content = await frame.content();
  console.log(content);

  const option = frame.getByLabel("건국대학교");
  await expect(option).toBeVisible();
  await option.click();
});
