import { Component, Prop, Element, State, h, Fragment, Watch } from '@stencil/core';
import { computePosition, offset } from '@floating-ui/dom';

import store from '../../store';

function getArrowProps (arrow?: {
  color?: string;
  placement?: 'top' | 'right' | 'bottom' | 'left' | 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'
  offset?: number,
}) {
  return Object.assign({}, {
    color: 'red',
    placement: 'bottom',
    offset: 8,
  }, arrow)
}

function getOutlineProps (outline?: {
  color?: string;
  offset?: number;
  width?: number;
}) {
  return Object.assign({}, {
    color: 'red',
    placement: 'bottom',
    offset: 4,
    width: 1,
  }, outline)
}

@Component({
  tag: 'scrshot-mark',
  styleUrl: 'scrshot-mark.css',
  shadow: true,
})
export class ScrshotMark {
  @Element() host = null;

  /**
   * 
   */
  @Prop() display: 'block' | 'inline-block' | 'flex' | 'inline-flex' = 'block';

  /**
   * 
   */
  @Prop() outline: {
    color?: string;
    offset?: number;
    width?: number
  } = getOutlineProps();
  
  /**
   * 
   */
  @Prop() arrow: {
    color?: string;
    placement?: 'top' | 'right' | 'bottom' | 'left' | 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'
    offset?: number
  } = getArrowProps();

  @State() arrowPosition: { x: number, y: number } = { x: null, y: null }

  componentWillLoad() {
    this.display = 'block';
    this.arrowPosition = { x: null, y: null };
    this.arrow = getArrowProps(this.arrow);
    this.outline = getOutlineProps(this.outline);
  }

  componentWillRender() {
    const container = this.host.shadowRoot.querySelector('#scrshot-mark');
    const arrow = this.host.shadowRoot.querySelector('#scrshot-arrow');

    computePosition(container, arrow, {
      placement: this.arrow.placement,
      middleware: [offset(this.outline.offset + this.arrow.offset)]
    }).then(({ x, y }) => {
      this.arrowPosition = { x, y }
    });
  }

  @Watch('arrow')
  updateArrowPlacement(next: {
    color?: string;
    placement?: 'top' | 'right' | 'bottom' | 'left' | 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'
    offset?: number
  }) {
    const container = this.host.shadowRoot.querySelector('#scrshot-mark');
    const arrow = this.host.shadowRoot.querySelector('#scrshot-arrow');
    const props = getArrowProps(next);

    computePosition(container, arrow, {
      placement: props.placement,
      middleware: [offset(this.outline.offset + props.offset)]
    }).then(({ x, y }) => {
      this.arrowPosition = { x, y}
    });
  }

  render() {

    return (
      <Fragment>
        <div 
          style={{
            '--scrshot-display': this.display, 
            '--scrshot-outline-offset': `${this.outline.offset}px`,
            '--scrshot-outline-color': this.outline.color,
            '--scrshot-outline-width': `${this.outline.width}px`
          }} 
          class={{ mark: store.isScreenshot || store.isDebug }}
          id="scrshot-mark"
        >
          <slot></slot>
        </div>
        <div
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
        </div>
      </Fragment>
    );
  }

}
