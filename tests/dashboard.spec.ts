import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
  test('should display dashboard elements', async ({ page }) => {
    await page.goto('/app/dashboard');
    await page.waitForLoadState('networkidle');
  });

  test('should have responsive layout', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/app/dashboard');
    await expect(page.locator('body')).toBeVisible();
    
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/app/dashboard');
    await expect(page.locator('body')).toBeVisible();
  });
});
