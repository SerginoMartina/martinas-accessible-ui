import { expect, test } from '@playwright/test';

test('homepage provides the component sidebar and an interactive progress example', async ({ page }) => {
  await page.goto('/');

  const navigation = page.getByRole('navigation', { name: 'Component documentation' });
  await expect(navigation).toBeVisible();
  await navigation.getByRole('button', { name: 'Progress bar' }).click();

  const progress = page.getByRole('progressbar', { name: 'Upload progress' });
  await expect(progress).toHaveAttribute('aria-valuenow', '35');
  await page.getByRole('button', { name: 'Advance by 10%' }).click();
  await expect(progress).toHaveAttribute('aria-valuenow', '45');
  await expect(page.getByRole('status').filter({ hasText: 'Upload is 45% complete.' })).toBeVisible();
});

test('mobile and tablet navigation uses a compact drill-down menu instead of the full sidebar', async ({ page }) => {
  for (const width of [390, 768]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');

    const sidebar = page.getByRole('navigation', { name: 'Component documentation' });
    const mobileNavigation = page.getByRole('navigation', { name: 'Mobile component navigation' });
    await expect(sidebar).toBeHidden();
    await expect(mobileNavigation).toBeVisible();
    const trigger = mobileNavigation.locator('button[aria-controls="mobile-component-menu"]');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect((await mobileNavigation.boundingBox())?.height).toBeLessThan(80);

    await trigger.click();
    await mobileNavigation.getByRole('button', { name: /Molecules/ }).click();
    await mobileNavigation.getByRole('button', { name: 'Tabs' }).click();
    await expect(page.getByRole('heading', { name: 'Tabs', level: 1 })).toBeVisible();
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  }
});
