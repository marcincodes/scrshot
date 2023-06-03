import { newSpecPage } from '@stencil/core/testing';
import { ScreenshotPreventScrolling } from '../scrshot-prevent-scrolling';

describe('screenshot-prevent-scrolling', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ScreenshotPreventScrolling],
      html: `<scrshot-prevent-scrolling></scrshot-prevent-scrolling>`,
    });
    expect(page.root).toEqualHtml(`
      <scrshot-prevent-scrolling>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </scrshot-prevent-scrolling>
    `);
  });
});
