import { Component, Fragment, Element, h } from '@stencil/core';

import store from '../../store';

@Component({
  tag: 'scrshot-area',
  styleUrl: 'scrshot-area.css',
  shadow: true,
})
export class ScreenshotArea {
  @Element() host!: HTMLElement;

  onToggleDebug() {
    store.isDebug = !store.isDebug 
  }

  render() {
    const { width, height } = this.host.getBoundingClientRect();

    return (
      <Fragment>
        <div class={{ backdrop: store.isDebug }} />
        <div data-testid="scrshot-area" class={{ debug: store.isDebug }}>
          <slot></slot>
        </div>
        <div class={{ measure: true, debug: store.isDebug }}>{Math.round(width)}x{Math.round(height)}</div>
        <button class={{ devtool: true, hide: store.isScreenshot }} onClick={() => this.onToggleDebug()}>
          Scrshot {store.isDebug ? <span class="on">ON</span> : <span class="off">OFF</span>} 
        </button>
      </Fragment>
    );
  }

}
