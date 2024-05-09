import { test, expect } from "./test";
import { fakerKO as faker } from "@faker-js/faker";

test("should add booth in the overview mode and delete booth", async ({
  page,
}) => {
  await page.goto("/add-booth/select-mode");
  await page.getByLabel("간단하게 생성하기").click({ force: true });
  const selectModeButton = page.getByRole("link", { name: "선택완료" });
  await expect(selectModeButton).toBeVisible();
  await selectModeButton.click();

  await page.waitForURL("/add-booth/set-position");
  const setPositionButton = page.getByRole("link", { name: "저장 완료" });
  await expect(setPositionButton).toBeVisible();
  await setPositionButton.click();

  const fakeName = faker.commerce.product();
  await page.waitForURL("/add-booth/set-name");
  await page.getByPlaceholder(/부스 이름/).fill(fakeName);
  const setNameButton = page.getByRole("link", { name: /입력완료/ });
  await expect(setNameButton).toBeVisible();
  await setNameButton.click();

  await page.waitForURL("/add-booth/set-category");
  await page.getByLabel("주점").click({ force: true });
  const setCategoryButton = page.getByRole("button", { name: /입력완료/ });
  await expect(setCategoryButton).toBeVisible();
  setCategoryButton.click();

  const fakeDescription = faker.commerce.productDescription();
  await page.waitForURL("/add-booth/set-description");
  await page
    .getByPlaceholder(/부스 컨텐츠, 판매 음식 등 자유롭게 부스를 소개해보세요/)
    .fill(fakeDescription);
  const setDescriptionButton = page.getByRole("button", { name: "입력완료" });
  await expect(setDescriptionButton).toBeVisible();
  await setDescriptionButton.click();

  await page.waitForURL("/");
  await expect(page.getByPlaceholder("운영중인 부스 없음")).not.toBeVisible();
  await expect(page.getByRole("heading", { name: fakeName })).toBeVisible();
  await expect(page.getByText(fakeDescription)).toBeVisible();

  const boothItem = page.getByTestId(`booth-item-${fakeName}`);
  await boothItem.getByRole("button", { name: "부스 삭제하기" }).click();
  await page.getByRole("button", { name: "삭제하기" }).click({ force: true });
  await expect(page.getByRole("heading", { name: fakeName })).not.toBeVisible();
  await expect(page.getByText(fakeDescription)).not.toBeVisible();
});
