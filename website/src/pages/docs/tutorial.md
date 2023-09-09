---
title: Tutorial
description: Tutorial how to add Scrshot to project. 
layout: ~/layouts/DocLayout.astro
---

# Tutorial

Welcome to the Scrshot tutorial that shows you how to use the Scrshot library in a real-world project. It's HappyReact my second project, [feedback widget for documentation](https://happyreact.com/). This project will be our guinea pig.

![](https://happyreact.com/og.jpg)

It's a next.js application, and most functionalities are behind authorization. It means it will be perfect for showcasing Scrshot capabilities

## Start from the basics

Let's install the Scrshot packages that we will need. We can do that from the npm registry:

```bash
yarn add @scrshot/cli @scrshot/react @scrshot/build
```

then we need create the Scrshot config. Create `.scrshotrc` file in the root of the project. It let us to define paths where we will need screenshots

```json
{
  "url": "http://localhost:3000",
  "dest": "public",
  "screenshots": {
    "homepage": {
      "path": "/"
    }
  }
}

```

and script in `package.json` file

```json
  "scripts": {
    "screenshots": "yarn scrshot dev"
  },
```

So far everything should be straightforward. We install packages, adding config that will let us make some basic screenshots. Also, adding scripts to `package.json` is similar to what we used to when adding new package to our project

## Screenshot area

Now, let's dig a little bit deeper. Scrshot expects us to mark the area where we want to take screenshot. To make it possible we need to use the `ScrshotArea` component. This is a huge benefit of Scrshot as we can take screenshot of elements we select not the whole webpage.


```tsx
import { ScrshotArea, defineCustomElements } from "@scrshot/react";

defineCustomElements();

function Component() {
  return (
    <ScrshotArea>
      This will be included in screenshot
    </ScrshotArea>
  )
}
```

After we add the `ScrshotArea` component in the bottom left there will be a Scrshot debug button. After clicking on it, it reveals simple scrshot devtools. They are useful to know what element will included in the screenshot. Here is sample how it looks lik:

![Scrshot devtools](/tutorial/scrshotarea.png)

After running `yarn screenshots` in our project we should create screenshot. This is how screenshot looks in my case:

![Alt text](/tutorial/homepage.png)

Let's recap what we have here. Screenshot will contain what's inside `<Scrshot></Scrshot>`  and **ONLY** this. You can preview screenshot clicking on the bottom-left corner button.

## Authorization
