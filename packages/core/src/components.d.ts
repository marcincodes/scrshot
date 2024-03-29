/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface ScrshotArea {
    }
    interface ScrshotMark {
        "arrow"?: {
    color?: string;
    placement?: 'top' | 'right' | 'bottom' | 'left' | 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'
    offset?: number
  };
        "display": 'block' | 'inline-block' | 'flex' | 'inline-flex';
        "outline"?: {
    color?: string;
    offset?: number;
    width?: number
  } | null;
    }
    interface ScrshotMask {
    }
}
declare global {
    interface HTMLScrshotAreaElement extends Components.ScrshotArea, HTMLStencilElement {
    }
    var HTMLScrshotAreaElement: {
        prototype: HTMLScrshotAreaElement;
        new (): HTMLScrshotAreaElement;
    };
    interface HTMLScrshotMarkElement extends Components.ScrshotMark, HTMLStencilElement {
    }
    var HTMLScrshotMarkElement: {
        prototype: HTMLScrshotMarkElement;
        new (): HTMLScrshotMarkElement;
    };
    interface HTMLScrshotMaskElement extends Components.ScrshotMask, HTMLStencilElement {
    }
    var HTMLScrshotMaskElement: {
        prototype: HTMLScrshotMaskElement;
        new (): HTMLScrshotMaskElement;
    };
    interface HTMLElementTagNameMap {
        "scrshot-area": HTMLScrshotAreaElement;
        "scrshot-mark": HTMLScrshotMarkElement;
        "scrshot-mask": HTMLScrshotMaskElement;
    }
}
declare namespace LocalJSX {
    interface ScrshotArea {
    }
    interface ScrshotMark {
        "arrow"?: {
    color?: string;
    placement?: 'top' | 'right' | 'bottom' | 'left' | 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'
    offset?: number
  };
        "display"?: 'block' | 'inline-block' | 'flex' | 'inline-flex';
        "outline"?: {
    color?: string;
    offset?: number;
    width?: number
  } | null;
    }
    interface ScrshotMask {
    }
    interface IntrinsicElements {
        "scrshot-area": ScrshotArea;
        "scrshot-mark": ScrshotMark;
        "scrshot-mask": ScrshotMask;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "scrshot-area": LocalJSX.ScrshotArea & JSXBase.HTMLAttributes<HTMLScrshotAreaElement>;
            "scrshot-mark": LocalJSX.ScrshotMark & JSXBase.HTMLAttributes<HTMLScrshotMarkElement>;
            "scrshot-mask": LocalJSX.ScrshotMask & JSXBase.HTMLAttributes<HTMLScrshotMaskElement>;
        }
    }
}
