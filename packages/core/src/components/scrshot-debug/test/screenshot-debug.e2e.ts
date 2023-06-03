import { newE2EPage } from '@stencil/core/testing';

describe('screenshot-debug', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<screenshot-debug></screenshot-debug>');

    const element = await page.find('screenshot-debug');
    expect(element).toHaveClass('hydrated');
  });
});
