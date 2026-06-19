import { expect, test } from "@playwright/test";

test("moves through the Wrapped cards and opens the constellation", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "DAD WRAPPED" })).toBeVisible();

  for (let index = 0; index < 9; index += 1) {
    await page.getByRole("button", { name: "Next card" }).click();
  }

  await expect(page.getByRole("heading", { name: "BUT THE BEST THINGS CAN'T BE COUNTED." })).toBeVisible();
  await page.getByRole("button", { name: "Open the memory constellation" }).click();
  await expect(page.getByRole("heading", { name: /Some things stay/ })).toBeVisible({ timeout: 3000 });
  await page.getByRole("button", { name: /Open memory 1/ }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
});

test("final message can be reached without opening every memory", async ({ page }) => {
  await page.goto("/");
  for (let index = 0; index < 9; index += 1) {
    await page.getByRole("button", { name: "Next card" }).click();
  }
  await page.getByRole("button", { name: "Open the memory constellation" }).click();
  await expect(page.getByRole("heading", { name: /Some things stay/ })).toBeVisible({ timeout: 3000 });
  await page.getByRole("button", { name: "Final message →" }).click();
  await expect(page.getByRole("heading", { name: /Happy Father’s Day/ })).toBeVisible();
});
