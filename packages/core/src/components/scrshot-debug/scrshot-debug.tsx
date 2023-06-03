import { Component, h } from '@stencil/core';
import store from '../../store';

@Component({
  tag: 'scrshot-debug',
  styleUrl: 'scrshot-debug.css',
  shadow: true,
})
export class ScreenshotDebug {
  onToggle() {
    store.isDebug = !store.isDebug 
  }

  render() {
    return (
      <div class="container">
        <button class={{ button: true, hide: store.isScreenshot }} onClick={() => this.onToggle()}>
          Scrshot {store.isDebug ? <span class="on">ON</span> : <span class="off">OFF</span>} 
        </button>
      </div>
    );
  }

}
