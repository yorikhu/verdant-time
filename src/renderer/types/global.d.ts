/// <reference types="preact/client" />

import type { JSX } from 'preact';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [tagName: string]: any;
    }
  }
}

export {};
