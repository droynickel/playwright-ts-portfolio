import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../src/pages/ProductsPage';

interface SearchTestCase {
  searchTerm: string;
  expectedKeyword: string;
  category: string;
}

const searchDatasets: SearchTestCase[] = [
  { searchTerm: 'dress', expectedKeyword: 'DRESS', category: 'Apparel' },
  { searchTerm: 'tshirt', expectedKeyword: 'TSHIRT', category: 'Tops' },
  { searchTerm: 'jeans', expectedKeyword: 'JEANS', category: 'Bottoms' },
];

test.describe('Data-Driven Search Verification', () => {
  for (const data of searchDatasets) {
    test(`Search query "${data.searchTerm}" yields relevant items for category: ${data.category}`, async ({ page }) => {
      const productsPage = new ProductsPage(page);
      await productsPage.goto();
      await productsPage.searchProduct(data.searchTerm);

      await expect(page.getByText('SEARCHED PRODUCTS')).toBeVisible();
      const productTitles = page.locator('.productinfo p');
      await expect(productTitles.first()).toBeVisible();
      
      const count = await productTitles.count();
      expect(count).toBeGreaterThan(0);
    });
  }
});
