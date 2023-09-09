import { newSpecPage } from '@stencil/core/testing';
import { ScreenshotMask } from '../scrshot-mask';

describe('screenshot-mask', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ScreenshotMask],
      html: `<scrshot-mask></scrshot-mask>`,
    });
    expect(page.root).toEqualHtml(`
      <scrshot-mask>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </scrshot-mask>
    `);
  });
});
