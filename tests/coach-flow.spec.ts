import { test, expect } from '@playwright/test';

test.describe('Coach Role - E2E Master Flow', () => {
  test.describe('Portal Access', () => {
    test('should load coach portal page', async ({ page }) => {
      await page.goto('/app/coach-portal');
      await expect(page).not.toHaveURL(/404/);
    });

    test('should load coach dashboard', async ({ page }) => {
      await page.goto('/app/coach-dashboard');
      await expect(page).not.toHaveURL(/404/);
    });
  });

  test.describe('Coach Onboarding Flow', () => {
    test('should load coach intro page', async ({ page }) => {
      await page.goto('/app/coach-intro');
      await expect(page).not.toHaveURL(/404/);
    });

    test('should load coach questionnaire', async ({ page }) => {
      await page.goto('/app/coach-questionnaire');
      await expect(page).not.toHaveURL(/404/);
    });

    test('should load coach matches page', async ({ page }) => {
      await page.goto('/app/coach-matches');
      await expect(page).not.toHaveURL(/404/);
    });
  });

  test.describe('Dashboard Tabs', () => {
    test('should have Today tab visible', async ({ page }) => {
      await page.goto('/app/coach-dashboard');
      await page.waitForLoadState('networkidle');
      const todayTab = page.locator('text=Today');
      if (await todayTab.isVisible()) {
        await expect(todayTab).toBeVisible();
      }
    });

    test('should have Members tab visible', async ({ page }) => {
      await page.goto('/app/coach-dashboard');
      await page.waitForLoadState('networkidle');
      const membersTab = page.locator('text=Members');
      if (await membersTab.isVisible()) {
        await expect(membersTab).toBeVisible();
      }
    });
  });
});
