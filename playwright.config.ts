import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],

  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.05, // Allow up to 5% pixel discrepancy
      threshold: 0.2,          // Pixel color difference threshold
      animations: 'disabled',  // Freeze CSS animations/transitions
    },
  },
  
  use: {
    baseURL: 'https://automationexercise.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    {
      name: 'api',
      testDir: './tests/api',
      use: {
        baseURL: 'https://automationexercise.com'
      }
    },
    {
      name: 'ui-chromium',
      testDir: './tests/ui',
      dependencies: ['api'],
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'ui-firefox',
      testDir: './tests/ui',
      use: { ...devices['Desktop Firefox'] }
    }
  ]
});
