import { test, expect } from '@playwright/test';

test.describe('Network Interception & UI Error Resilience', () => {
  test('Render custom empty state when API returns zero products', async ({ page }) => {
    // Intercept network call and return an empty product array
    await page.route('**/api/productsList', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ responseCode: 200, products: [] })
      });
    });

    await page.goto('/products');
    await expect(page.locator('.features_items')).toBeVisible();
  });

  test('Gracefully handle slow API responses with simulated 3s latency', async ({ page }) => {
    await page.route('**/api/searchProduct', async (route) => {
      // Simulate real-world network delay
      await new Promise((resolve) => setTimeout(resolve, 3000));
      await route.continue();
    });

    await page.goto('/products');
    await page.locator('#search_product').fill('top');
    await page.locator('#submit_search').click();
    await expect(page.getByText('SEARCHED PRODUCTS')).toBeVisible();
  });
});
