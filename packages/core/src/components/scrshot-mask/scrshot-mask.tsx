import { Component, h } from '@stencil/core';

import store from '../../store';

@Component({
  tag: 'scrshot-mask',
  styleUrl: 'scrshot-mask.css',
  shadow: true,
})
export class ScreenshotMask {

  render() {
    return (
      <div 
        data-testid="scrshot-prevent-scrolling" 
        class={{ debug: store.isDebug, hide: store.isScreenshot }}
      >
        <slot></slot>
      </div>
    );
  }

}
