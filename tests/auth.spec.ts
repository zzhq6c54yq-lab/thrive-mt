import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should display login page', async ({ page }) => {
    await page.goto('/app/auth');
    await expect(page.locator('text=ThriveMT')).toBeVisible();
  });

  test('should redirect unauthenticated users from protected routes', async ({ page }) => {
    await page.goto('/app/dashboard');
    await expect(page).toHaveURL(/\/(app\/auth|$)/);
  });

  test('should show logout confirmation on auth page', async ({ page }) => {
    await page.goto('/app/auth');
    await expect(page.locator('text=logged out')).toBeVisible();
  });
});
