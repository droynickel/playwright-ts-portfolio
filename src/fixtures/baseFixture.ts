import { test as base, expect, Page } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';

type CustomFixtures = {
  productsPage: ProductsPage;
  authenticatedSession: Page;
};

export const test = base.extend<CustomFixtures>({
  productsPage: async ({ page }, use) => {
    const productsPage = new ProductsPage(page);
    await productsPage.goto();
    await use(productsPage);
  },

  authenticatedSession: async ({ browser }, use) => {
    // Demonstrates custom storage state injection
    const context = await browser.newContext({
      extraHTTPHeaders: {
        'x-authtoken-header': 'mock-session-jwt-token'
      }
    });
    const page = await context.newPage();
    await use(page);
    await context.close();
  }
});

export { expect };
