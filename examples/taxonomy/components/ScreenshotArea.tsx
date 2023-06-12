"use client"

import { ScrshotArea, defineCustomElements } from '@scrshot/react';

defineCustomElements();

export function ScreenshotArea({ children }) {
  return (
    <>
      <ScrshotArea>
        {children} 
      </ScrshotArea>
    </>
  )
}
