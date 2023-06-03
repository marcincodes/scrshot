import { newE2EPage } from '@stencil/core/testing';

describe('screenshot-area', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<screenshot-area></screenshot-area>');

    const element = await page.find('screenshot-area');
    expect(element).toHaveClass('hydrated');
  });
});
