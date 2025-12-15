import { test, expect } from '@playwright/test';

test.describe('Client Role - E2E Master Flow', () => {
  test.describe('Core Navigation', () => {
    test('should access dashboard in demo mode', async ({ page }) => {
      await page.goto('/app?demo=true');
      await expect(page).not.toHaveURL(/404/);
    });

    test('should navigate to all wellness tools without 404', async ({ page }) => {
      const wellnessTools = [
        '/app/breathing-exercise',
        '/app/meditation-studio',
        '/app/binaural-beats',
        '/app/art-therapy',
        '/app/music-therapy',
        '/app/video-diary',
        '/app/games-and-quizzes',
        '/app/sleep-tracker',
        '/app/journaling'
      ];

      for (const tool of wellnessTools) {
        await page.goto(tool);
        await expect(page).not.toHaveURL(/404/);
      }
    });

    test('should navigate to therapy booking', async ({ page }) => {
      await page.goto('/app/therapy-booking');
      await expect(page).not.toHaveURL(/404/);
    });

    test('should navigate to assessments', async ({ page }) => {
      await page.goto('/app/assessments');
      await expect(page).not.toHaveURL(/404/);
    });

    test('should navigate to workshops', async ({ page }) => {
      await page.goto('/app/workshops');
      await expect(page).not.toHaveURL(/404/);
    });
  });

  test.describe('Communication Features', () => {
    test('should access Henry AI companion', async ({ page }) => {
      await page.goto('/app/henry');
      await expect(page).not.toHaveURL(/404/);
    });

    test('should access mini session', async ({ page }) => {
      await page.goto('/app/mini-session');
      await expect(page).not.toHaveURL(/404/);
    });

    test('should access dear henry', async ({ page }) => {
      await page.goto('/app/dear-henry');
      await expect(page).not.toHaveURL(/404/);
    });
  });

  test.describe('Community Features', () => {
    test('should access community groups', async ({ page }) => {
      await page.goto('/app/community-groups');
      await expect(page).not.toHaveURL(/404/);
    });

    test('should access buddy system', async ({ page }) => {
      await page.goto('/app/buddy-system');
      await expect(page).not.toHaveURL(/404/);
    });

    test('should access life transitions', async ({ page }) => {
      await page.goto('/app/life-transitions');
      await expect(page).not.toHaveURL(/404/);
    });

    test('should access support circle', async ({ page }) => {
      await page.goto('/app/support-circle');
      await expect(page).not.toHaveURL(/404/);
    });
  });

  test.describe('Back Button Navigation', () => {
    test('should return to dashboard from wellness tools', async ({ page }) => {
      await page.goto('/app/breathing-exercise');
      const backButton = page.locator('[aria-label="Go back"], button:has-text("Back"), button:has-text("Return")').first();
      
      if (await backButton.isVisible()) {
        await backButton.click();
        await expect(page).toHaveURL(/\/app\/dashboard|\/app$/);
      }
    });
  });

  test.describe('Data Persistence', () => {
    test('should load profile page', async ({ page }) => {
      await page.goto('/app/profile');
      await expect(page).not.toHaveURL(/404/);
    });

    test('should load goals page', async ({ page }) => {
      await page.goto('/app/goals');
      await expect(page).not.toHaveURL(/404/);
    });
  });
});
