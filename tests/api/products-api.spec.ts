import { test, expect } from '@playwright/test';

test.describe('Products API Verification', () => {
  test('GET /api/productsList returns 200 with schema payload', async ({ request }) => {
    const response = await request.get('/api/productsList');
    expect(response.status()).toBe(200);

    const body = JSON.parse(await response.text());
    expect(body.responseCode).toBe(200);
    expect(Array.isArray(body.products)).toBeTruthy();
    expect(body.products.length).toBeGreaterThan(0);

    const sampleProduct = body.products[0];
    expect(sampleProduct).toHaveProperty('id');
    expect(sampleProduct).toHaveProperty('name');
    expect(sampleProduct).toHaveProperty('price');
  });

  test('POST /api/searchProduct with criteria returns matching items', async ({ request }) => {
    const response = await request.post('/api/searchProduct', {
      form: { search_product: 'tshirt' }
    });
    expect(response.status()).toBe(200);

    const body = JSON.parse(await response.text());
    expect(body.responseCode).toBe(200);
    expect(body.products.length).toBeGreaterThan(0);
  });
});
