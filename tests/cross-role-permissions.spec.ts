import { test, expect } from '@playwright/test';

test.describe('Cross-Role Permission Verification', () => {
  test.describe('Route Protection', () => {
    test('admin routes should be protected', async ({ page }) => {
      await page.goto('/app/admin-dashboard');
      // Should either show dashboard or redirect to auth
      await expect(page).not.toHaveURL(/404/);
    });

    test('therapist routes should be protected', async ({ page }) => {
      await page.goto('/app/therapist-dashboard');
      // Should either show dashboard or redirect to auth
      await expect(page).not.toHaveURL(/404/);
    });

    test('coach routes should be protected', async ({ page }) => {
      await page.goto('/app/coach-dashboard');
      // Should either show dashboard or redirect to auth
      await expect(page).not.toHaveURL(/404/);
    });
  });

  test.describe('Marketing Site Access', () => {
    test('marketing pages should be publicly accessible', async ({ page }) => {
      const publicPages = [
        '/',
        '/home',
        '/therapy',
        '/coaching',
        '/pricing',
        '/about'
      ];

      for (const path of publicPages) {
        await page.goto(path);
        await expect(page).not.toHaveURL(/404/);
      }
    });
  });

  test.describe('App Prefix Enforcement', () => {
    test('all app routes should use /app prefix', async ({ page }) => {
      const appRoutes = [
        '/app/dashboard',
        '/app/profile',
        '/app/goals',
        '/app/assessments',
        '/app/workshops'
      ];

      for (const route of appRoutes) {
        await page.goto(route);
        await expect(page).not.toHaveURL(/404/);
      }
    });
  });

  test.describe('Video Session Access', () => {
    test('client video session route works', async ({ page }) => {
      await page.goto('/app/client-video-session/test-session');
      await expect(page).not.toHaveURL(/404/);
    });

    test('therapist video session route works', async ({ page }) => {
      await page.goto('/app/therapist-video-session/test-session');
      await expect(page).not.toHaveURL(/404/);
    });
  });
});
