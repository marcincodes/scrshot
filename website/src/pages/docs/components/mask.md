---
title: Mask - Component
description: Scrshot intro
layout: ~/layouts/DocLayout.astro
---

# Mask Component

On every page there are many elements that can interrupt process of taking a screenshot. Some of them like header can be appear multiple time when they floating at the top of the screen. This is especially true for wide screenshots with tall screenshot area. To prevent this, you can use `ScrshotMask` to hide such elements when screenshot is taken. 

Also, there are many other use cases for hiding certain elements like sensitive information or elements that are not so important.

`ScrshotMask` removes elements only visually and preserve space so you layout will stay the same.


### React

```jsx
import { defineCustomElements, ScrshotArea, ScrshotMask } from '@scrshot/react';


defineCustomElements();

function Component() {
  return (
    <div>
      This won't be on screenshot
      <ScrshotArea>
        <div>This will be on screenshot <ScrshotMask>but this won't</ScrshotMask></div>
      </ScrshotArea>
    </div>
  )
}
```
