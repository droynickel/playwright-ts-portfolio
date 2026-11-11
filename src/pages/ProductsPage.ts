import { Page, Locator, expect } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly productCards: Locator;
  readonly addToCartOverlay: Locator;
  readonly modalConfirmBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.productCards = page.locator('.single-products');
    this.addToCartOverlay = page.locator('.overlay-content .add-to-cart');
    this.modalConfirmBtn = page.getByRole('button', { name: 'Continue Shopping' });
  }

  async goto() {
    await this.page.goto('/products');
  }

  async searchProduct(term: string) {
    await this.searchInput.fill(term);
    await this.searchButton.click();
  }

  async addFirstVisibleItemToCart() {
    const firstItem = this.productCards.first();
    await firstItem.hover();
    await firstItem.locator('.add-to-cart').first().click();
    await this.modalConfirmBtn.waitFor({ state: 'visible' });
    await this.modalConfirmBtn.click();
  }

  async verifyProductsCountGreaterThan(count: number) {
    await expect(this.productCards).toHaveCount(count);
  }
}
