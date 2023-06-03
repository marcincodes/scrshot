import { Component, h } from '@stencil/core';

import store from '../../store';

@Component({
  tag: 'scrshot-prevent-scrolling',
  styleUrl: 'scrshot-prevent-scrolling.css',
  shadow: true,
})
export class ScreenshotPreventScrolling {

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
