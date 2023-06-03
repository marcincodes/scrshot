import { newSpecPage } from '@stencil/core/testing';
import { ScrshotMark } from '../scrshot-mark';

describe('scrshot-mark', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ScrshotMark],
      html: `<scrshot-mark></scrshot-mark>`,
    });
    expect(page.root).toEqualHtml(`
      <scrshot-mark>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </scrshot-mark>
    `);
  });
});
