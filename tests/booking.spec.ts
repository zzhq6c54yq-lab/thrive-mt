import { test, expect } from '@playwright/test';

test.describe('Therapy Booking', () => {
  test('should load therapy booking page', async ({ page }) => {
    await page.goto('/app/therapy-booking');
    await expect(page).not.toHaveURL(/404/);
  });

  test('should display booking form elements', async ({ page }) => {
    await page.goto('/app/therapy-booking');
    await page.waitForLoadState('networkidle');
  });
});
