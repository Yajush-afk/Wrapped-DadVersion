import { expect, test } from "@playwright/test";

test("moves through the Wrapped cards and opens the constellation", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "DAD WRAPPED" })).toBeVisible();

  for (let index = 0; index < 9; index += 1) {
    await page.getByRole("button", { name: "Next card" }).click();
  }

  await expect(page.getByRole("heading", { name: "BUT THE BEST THINGS CAN'T BE COUNTED." })).toBeVisible();
  await page.getByRole("button", { name: "Open 8 things I learned" }).click();
  await expect(page.getByRole("heading", { name: /8 things I learned/ })).toBeVisible({ timeout: 3000 });
  await page.getByRole("button", { name: /Open lesson 1/ }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
});

test("final message can be reached without opening every lesson", async ({ page }) => {
  await page.goto("/");
  for (let index = 0; index < 9; index += 1) {
    await page.getByRole("button", { name: "Next card" }).click();
  }
  await page.getByRole("button", { name: "Open 8 things I learned" }).click();
  await expect(page.getByRole("heading", { name: /8 things I learned/ })).toBeVisible({ timeout: 3000 });
  await page.getByRole("button", { name: "Final message →" }).click();
  await expect(page.getByRole("heading", { name: /Happy Father’s Day/ })).toBeVisible();
});

test("reload restores the current Wrapped card", async ({ page }) => {
  await page.goto("/");
  for (let index = 0; index < 3; index += 1) {
    await page.getByRole("button", { name: "Next card" }).click();
  }

  await expect(page.getByLabel("Card 4 of 10")).toBeVisible();
  await page.reload();

  await expect(page.getByLabel("Card 4 of 10")).toBeVisible();
  await expect(page.getByRole("heading", { name: "THE LONG WAY, BECAUSE IT HAS LESS TRAFFIC" })).toBeVisible();
});
