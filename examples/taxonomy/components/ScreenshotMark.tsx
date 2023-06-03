"use client"

import { ScrshotMark } from '@scrshot/react';

export function ScreenshotMark({ children }) {
  return (
    <>
      <ScrshotMark>
        {children}
      </ScrshotMark>
    </>
  )
}
