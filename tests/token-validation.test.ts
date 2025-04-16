import { test, expect } from "@playwright/test";

test.describe("Token Validation", () => {
  const tokenStatuses = [
    ["invalid_format", "invalid_format"],
    ["invalid_format", "empty"],
    ["invalid_format", "expired"],
    ["empty", "invalid_format"],
    ["empty", "empty"],
    ["empty", "expired"],
    ["expired", "invalid_format"],
    ["expired", "empty"],
    ["expired", "expired"],
  ] as const;

  // 각 조합에 대한 테스트를 개별 describe로 분리
  for (const [accessStatus, refreshStatus] of tokenStatuses) {
    test.describe(`Token state: access=${accessStatus}, refresh=${refreshStatus}`, () => {
      test.use({
        storageState: `playwright/.auth/${accessStatus}-${refreshStatus}.json`,
      });

      test("should redirect to sign-in", async ({ page }) => {
        await page.goto("/");
        await expect(page).toHaveURL(/\/sign-in/);
      });
    });
  }
});
