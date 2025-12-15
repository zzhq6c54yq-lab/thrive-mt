import { test, expect } from '@playwright/test';

test.describe('Specialized Portals - E2E Master Flow', () => {
  test.describe('Veteran Portal', () => {
    test('should load veteran portal', async ({ page }) => {
      await page.goto('/app/veteran-portal');
      await expect(page).not.toHaveURL(/404/);
    });
  });

  test.describe('First Responder Portal', () => {
    test('should load first responder portal', async ({ page }) => {
      await page.goto('/app/first-responder-portal');
      await expect(page).not.toHaveURL(/404/);
    });
  });

  test.describe('Golden Years Portal', () => {
    test('should load golden years portal', async ({ page }) => {
      await page.goto('/app/golden-years-portal');
      await expect(page).not.toHaveURL(/404/);
    });
  });

  test.describe('Adolescent Portal', () => {
    test('should load adolescent portal', async ({ page }) => {
      await page.goto('/app/adolescent-portal');
      await expect(page).not.toHaveURL(/404/);
    });
  });

  test.describe('Educator Portal', () => {
    test('should load educator portal', async ({ page }) => {
      await page.goto('/app/educator-portal');
      await expect(page).not.toHaveURL(/404/);
    });
  });

  test.describe('Corporate Portal', () => {
    test('should load corporate portal', async ({ page }) => {
      await page.goto('/app/corporate-portal');
      await expect(page).not.toHaveURL(/404/);
    });
  });

  test.describe('Single Parents Portal', () => {
    test('should load single parents portal', async ({ page }) => {
      await page.goto('/app/single-parents-portal');
      await expect(page).not.toHaveURL(/404/);
    });
  });

  test.describe('Small Business Portal', () => {
    test('should load small business portal', async ({ page }) => {
      await page.goto('/app/small-business-portal');
      await expect(page).not.toHaveURL(/404/);
    });
  });

  test.describe('Family Support Portal', () => {
    test('should load family support portal', async ({ page }) => {
      await page.goto('/app/family-support');
      await expect(page).not.toHaveURL(/404/);
    });
  });
});
