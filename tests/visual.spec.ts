import { test, expect } from "@playwright/test";
import path from "path";

const fileUrl = "file:///" + path.resolve(__dirname, "..", "index.html").replace(/\\/g, "/");

test("hero renders and links are correct", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(fileUrl);
  await expect(page.locator(".hero__title")).toBeVisible();
  await page.waitForTimeout(2200);
  await page.screenshot({ path: "tests/screenshots/hero.png" });

  await page.setViewportSize({ width: 1440, height: 2700 });
  await page.waitForTimeout(600);
  await page.mouse.wheel(0, 3000);
  await page.waitForTimeout(500);
  await page.screenshot({ path: "tests/screenshots/full.png", fullPage: true });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: "tests/screenshots/mobile.png", fullPage: true });

  expect(errors, `console/page errors: ${errors.join(", ")}`).toHaveLength(0);

  await expect(page.locator('a[href*="wolt.com"]')).toHaveCount(1);
  await expect(page.locator('a[href*="foodora.at"]')).toHaveCount(1);
  await expect(page.locator('a[href*="lieferando.at"]')).toHaveCount(1);
  await expect(page.locator('a[href*="velofood.at"]')).toHaveCount(1);
  await expect(page.locator('a[href*="qr.secret-it.eu"]').first()).toHaveCount(1);
});
