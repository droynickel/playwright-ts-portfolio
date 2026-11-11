import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../src/pages/ProductsPage';

test.describe('E2E Products & Cart Journeys', () => {
  let productsPage: ProductsPage;

  test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page);
    await productsPage.goto();
  });

  test('Search and inspect product item list', async ({ page }) => {
    await productsPage.searchProduct('jeans');
    await expect(page.getByText('SEARCHED PRODUCTS')).toBeVisible();
    await productsPage.addFirstVisibleItemToCart();

    await page.goto('/view_cart');
    await expect(page.locator('#cart_info_table tbody tr')).toBeVisible();
  });

  test('Simulate network failure handling', async ({ page }) => {
    await page.route('**/api/productsList', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' })
      });
    });
    await productsPage.goto();
  });
});
