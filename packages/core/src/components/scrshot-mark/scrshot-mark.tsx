import { Component, Prop, Element, h, Fragment } from '@stencil/core';

import store from '../../store';

@Component({
  tag: 'scrshot-mark',
  styleUrl: 'scrshot-mark.css',
  shadow: true,
})
export class ScrshotMark {

  @Element() host!: HTMLElement;

  /**
   * 
   */
  @Prop() display: 'block' | 'inline-block' | 'flex' | 'inline-flex' = 'block';

  /**
   * 
   */
  @Prop() outline?: {
    color?: string;
    offset?: number;
    width?: number
  } | null;
  
  /**
   * 
   */
  @Prop() arrow?: {
    color?: string;
    placement?: 'top' | 'right' | 'bottom' | 'left' | 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'
    offset?: number
  };

  componentWillLoad() {
    this.display = this.display || 'block';
    
    if (this.arrow && typeof(this.arrow) === 'object') {
      this.arrow = Object.assign({}, {
        color: 'red',
        placement: 'bottom',
        offset: 8,
      }, this.arrow)
    }

    if (this.outline !== null) {
      this.outline = Object.assign({}, {
        color: 'red',
        offset: 4,
        width: 1,
      }, this.outline)
    }
  }

  render() {
    const markStyles = {
      '--scrshot-display': this.display, 
    }

    if (this.outline) {
      markStyles['--scrshot-outline-offset'] = `${this.outline.offset}px`;
      markStyles['--scrshot-outline-color'] = this.outline.color;
      markStyles['--scrshot-outline-width'] = `${this.outline.width}px`;
    }

    return (
      <Fragment>
        <div 
          style={markStyles} 
          class={{ mark: store.isScreenshot || store.isDebug }}
          id="scrshot-mark"
        >
          <slot></slot>
        </div>
        {/* <div
          style={{
            '--scrshot-arrow-color': this.arrow.color,
            left: `${this.arrowPosition.x}px`,
            top: `${this.arrowPosition.y}px`,
          }}
          class={{
            arrow: true,
            show: store.isScreenshot || store.isDebug,
            [`position-${this.arrow.placement}`]: true
          }} 
          id="scrshot-arrow"
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 0 32 32">
            <path d="m26.71 10.29-10-10a1 1 0 0 0-1.41 0l-10 10 1.41 1.41L15 3.41V32h2V3.41l8.29 8.29z" stroke="currentColor" fill="currentColor" />
          </svg>
        </div> */}
      </Fragment>
    );
  }

}
