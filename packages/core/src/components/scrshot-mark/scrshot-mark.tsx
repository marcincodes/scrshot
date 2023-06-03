import { Component, Prop, h } from '@stencil/core';

import store from '../../store';

@Component({
  tag: 'scrshot-mark',
  styleUrl: 'scrshot-mark.css',
  shadow: true,
})
export class ScrshotMark {

  @Prop() display: CSSStyleDeclaration['display'] = 'block';
  @Prop() offset: number = 4;

  render() {
    return (
      <div style={{
        '--scrshot-display': this.display, 
        '--scrshot-outline-offset': `${this.offset}px` 
      }} 
      class={{ mark: store.isScreenshot || store.isDebug }}>
        <slot></slot>
      </div>
    );
  }

}
