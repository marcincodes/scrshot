"use client"

import { ScrshotMask } from '@scrshot/react';

export function ScreenshotMask({ children }) {
  return (
    <ScrshotMask>
      {children}
    </ScrshotMask>
  )
}
