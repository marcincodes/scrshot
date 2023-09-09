---
title: Mark - Component
description: Scrshot intro
layout: ~/layouts/DocLayout.astro
---

# Mark Component

Screenshot need to direct user focus to specific elements. This can be achieved using `ScrshotMark` component. 


### React

```jsx
import { defineCustomElements, ScrshotArea, ScrshotMask, ScrshotMark } from '@scrshot/react';


defineCustomElements();

function Component() {
  return (
    <div>
      This won't be on screenshot
      <ScrshotArea>
        <div>
          This will be on screenshot <ScrshotMask>but this won't</ScrshotMask>, and <ScrshotMark>will be marked</ScrshotMark>
        </div>
      </ScrshotArea>
    </div>
  )
}
```
