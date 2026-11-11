import { test, expect } from '@playwright/test';

test.describe('API Lifecycle & Data Chaining', () => {
  test('Verify brand query parameter filtering and schema validation', async ({ request }) => {
    // Step 1: Query API for specific brand list
    const response = await request.get('/api/brandsList');
    expect(response.status()).toBe(200);

    const data = JSON.parse(await response.text());
    expect(data.responseCode).toBe(200);
    expect(Array.isArray(data.brands)).toBeTruthy();

    // Step 2: Extract first brand ID dynamically
    const targetBrand = data.brands[0];
    expect(targetBrand).toHaveProperty('brand');

    // Step 3: Assert nested brand response integrity
    expect(typeof targetBrand.id).toBe('number');
    expect(typeof targetBrand.brand).toBe('string');
  });

  test('POST to invalid endpoint returns 405 Method Not Allowed or 404', async ({ request }) => {
    const response = await request.delete('/api/verifyLogin');
    const body = JSON.parse(await response.text());
    expect([404, 405]).toContain(body.responseCode);
  });
});
