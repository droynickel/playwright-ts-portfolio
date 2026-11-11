import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Automated WCAG Accessibility Audits', () => {
  test('Homepage passes critical WCAG 2.1 AA accessibility standards', async ({ page }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      // Exclude third-party ad iframes if present on test target
      .exclude('iframe')
      .analyze();

    // Verify no critical violations exist
    const criticalViolations = accessibilityScanResults.violations.filter(
      (v) => v.impact === 'critical'
    );

    expect(criticalViolations).toEqual([]);
  });
});
