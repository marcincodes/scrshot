import { newE2EPage } from '@stencil/core/testing';

describe('screenshot-prevent-scrolling', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<screenshot-prevent-scrolling></screenshot-prevent-scrolling>');

    const element = await page.find('screenshot-prevent-scrolling');
    expect(element).toHaveClass('hydrated');
  });
});
