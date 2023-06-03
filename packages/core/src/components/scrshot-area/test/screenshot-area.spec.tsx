import { newSpecPage } from '@stencil/core/testing';
import { ScreenshotArea } from '../scrshot-area';

describe('scrshot-area', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ScreenshotArea],
      html: `<scrshot-area></scrshot-area>`,
    });
    expect(page.root).toEqualHtml(`
      <scrshot-area>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </scrshot-area>
    `);
  });
});
