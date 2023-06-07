"use client"

import { ScrshotMark } from '@scrshot/react';

export function ScreenshotMark({ children }) {
  return (
    <>
      <ScrshotMark outline={{ offset: 20, color: 'green', width: 5 }} arrow={{ offset: 50, color: 'red', placement: 'bottom' }}>
        {children}
      </ScrshotMark>
    </>
  )
}
