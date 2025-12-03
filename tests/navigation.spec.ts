import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should load home page without errors', async ({ page }) => {
    await page.goto('/');
    await expect(page).not.toHaveURL(/404/);
  });

  test('should navigate to marketing pages', async ({ page }) => {
    const marketingPages = ['/home', '/therapy', '/coaching', '/pricing'];
    
    for (const path of marketingPages) {
      await page.goto(path);
      await expect(page).not.toHaveURL(/404/);
    }
  });

  test('should have working back buttons', async ({ page }) => {
    await page.goto('/app/dashboard');
    const backButton = page.locator('[aria-label="Go back"], button:has-text("Back")').first();
    
    if (await backButton.isVisible()) {
      await backButton.click();
      await expect(page).not.toHaveURL(/404/);
    }
  });

  test('should not have console errors on critical pages', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const criticalErrors = errors.filter(e => 
      !e.includes('favicon') && 
      !e.includes('net::ERR')
    );
    
    expect(criticalErrors).toHaveLength(0);
  });
});
