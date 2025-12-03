import { test, expect } from '@playwright/test';

test.describe('Video Sessions', () => {
  test('should load client video session page', async ({ page }) => {
    await page.goto('/app/client-video-session/test-session');
    await expect(page).not.toHaveURL(/404/);
  });

  test('should display video controls', async ({ page }) => {
    await page.goto('/app/client-video-session/test-session');
    await page.waitForLoadState('networkidle');
  });
});
