import { newSpecPage } from '@stencil/core/testing';
import { ScreenshotDebug } from '../scrshot-debug';

describe('screenshot-debug', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ScreenshotDebug],
      html: `<scrshot-debug></scrshot-debug>`,
    });
    expect(page.root).toEqualHtml(`
      <scrshot-debug>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </scrshot-debug>
    `);
  });
});
