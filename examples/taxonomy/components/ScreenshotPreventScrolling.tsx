"use client"

import { ScrshotPreventScrolling } from '@scrshot/react';

export function ScreenshotPreventScrolling({ children }) {
  return (
    <>
      <ScrshotPreventScrolling>
        {children}
      </ScrshotPreventScrolling>
    </>
  )
}
