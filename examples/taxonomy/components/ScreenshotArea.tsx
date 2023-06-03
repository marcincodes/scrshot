"use client"

import { ScrshotArea, ScrshotDebug, defineCustomElements } from '@scrshot/react';

defineCustomElements();

export function ScreenshotArea({ children }) {
  return (
    <>
      <ScrshotArea>
        {children} 
      </ScrshotArea>
      <ScrshotDebug />
    </>
  )
}
