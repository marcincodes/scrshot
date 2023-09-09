---
title: Area - Component
description: Scrshot intro
layout: ~/layouts/DocLayout.astro
---

# ScrshotArea Component

With this component you crop screenshot to certain area. Only space between opening tag and closing tag of this component will be included in screenshot. Thanks to `ScrshotArea` you can focus on important part of the page. It's additionally adding devtools where you can check what will be the size of the screenshot.

## Rules

- Only ONE component can be on page
- Floating html elements that are outside area will be trimmed


### React

```jsx
import { defineCustomElements, ScrshotArea } from '@scrshot/react';


defineCustomElements();

function Component() {
  return (
    <div>
      This won't be on screenshot
      <ScrshotArea>
        <div>This will be on screenshot</div>
      </ScrshotArea>
    </div>
  )
}
```

## Turning on/off devtools

At the bottom-left corner will be floating button mn every page where we use this component. You can click it to turn on/off scrshot devtools.

