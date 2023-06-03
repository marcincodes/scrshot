import { newE2EPage } from '@stencil/core/testing';

describe('scrshot-mark', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<scrshot-mark></scrshot-mark>');

    const element = await page.find('scrshot-mark');
    expect(element).toHaveClass('hydrated');
  });
});
