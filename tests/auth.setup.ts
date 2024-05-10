import { expect, test as setup } from "./test";

const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ page }) => {
  await page.goto("/sign-in");
  await page
    .getByPlaceholder("아이디를 입력해주세요")
    .fill(process.env.VERIFIED_ACCOUNT_ID!);
  await page
    .getByPlaceholder("비밀번호를 입력해주세요")
    .fill(process.env.VERIFIED_ACCOUNT_PASSWORD!);
  console.log(process.env.VERIFIED_ACCOUNT_ID);
  console.log(process.env.VERIFIED_ACCOUNT_PASSWORD);
  await page.getByRole("button", { name: "로그인" }).click();
  await page.waitForURL("/");
  await expect(page.getByText("운영중인 부스 없음")).not.toBeVisible();

  await page.context().storageState({ path: authFile });
});
