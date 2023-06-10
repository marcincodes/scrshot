---
title: Installation
description: Scrshot installation
layout: ~/layouts/DocLayout.astro
---

# Installation

## Scrshot components

Every project is different that's why we need to make a frame for our screenshots. Thanks to Scrshot components
we can do it by installing them form npm registry.

Using npm:

```bash
npm install @scrshot/react
```

Using yarn:

```bash
yarn add @scrshot/react
```

Using pnpm:

```bash
pnpm install @scrshot/react
```

Before we start to dig in particular components there is one important thing we need to know. 
Components are made as [web components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) 
with React components wrappers. That mean we need to define them before usage. To make that
you should import `defineCustomElements` from `@scrshot/react` library and call it before usage of components.
Best place for that is in `App.tsx{jsx}` component.

Here is example:

```tsx
import { defineCustomElements } from '@scrshot/react';

defineCustomElements();

function App() {
  return (
    <YourApp />
  )
}

export default App
```

You cannot call it inside component function.

Alternatively, you can call it where you are using `ScrshotArea` component.

We have 4 components and they are used for different purpose:

### `ScrshotArea`

It marks area that should be included in screenshot. Everything outside of this area won't be visible and your screenshot will be trimmed. You can have only one of this component on page.

### `ScrshotDebug`

Adds to a page floating button that turn-on / turn-off "debug mode" where you can see how screenshot will look like,
all markers and if something scrolls into screenshot view.

### `ScrshotPreventScrolling`

When we have tall screenshot floating element can scroll into view of screenshot. Depending of the height of screenshot area
it can appear couple times covering important parts of screenshot. This component make it disappear when screenshot is done.

### `ScrshotMark`

Sometimes we want to mark important parts of screenshot like buttons, alerts or texts. This component will let you do that and be reflected on final screenshot.

## Scrshot CLI

In our project we can install CLI from npm registry. CLI is creating screenshots of our application
and saving it into destination directory we provide.

Using npm:

```bash
npm install @scrshot/cli --save-dev
```

Using yarn:

```bash
yarn add @scrshot/cli --dev
```

Using pnpm:

```bash
pnpm install @scrshot/cli --save-dev
```

Now we can add shorthand command to our package.json file in `scripts` section:

```json
"screenshots": "scrshot dev"
```

Last part of configuration, we need to add config file. Let's create file `.scrshotrc` with following
content: 

```json
{
  "url": "<application url>",
  "dest": "<destination path>",
  "license": "<your license key>",
  "screenshots": {
    "homepage": {
      "path": "/"
    },
  }
}
```

Depending on the application url, path and license key this file should be filled accordingly.

After everything is filled we can run newly created command to create screenshots:

Using npm:

```bash
npm run screenshots
```

Using yarn:

```bash
yarn screenshots
```

Using pnpm:

```bash
pnpm run screenshots
```


## Scrshot bundler plugin

Scrshot is great in development but it has some footprint on your application. Also, even if I try to make everything to support all application not all of them will be comfortable to display their content inside "development tool" components.

Plugin will remove all scrshot components from your code and replace it with `div` tags. Most application won't notice anything but if you rely on the order of div tags eg. in css please be caution.

We can install it from npm.

Using npm:

```bash
npm install @scrshot/bundler --save-dev
```

Using yarn:

```bash
yarn add @scrshot/bundler --dev
```

Using pnpm:

```bash
pnpm install @scrshot/bundler --save-dev
```

Then in our webpack config file we can use it like any other plugin:

```tsx
const path = require('path');
const unplugin = require('@scrshot/bundler').unplugin;

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    /* other plugins */
    unplugin.webpack())
  ]
};
```

Also, you can use it in vite:

```tsx
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { unplugin } from '@scrshot/bundler';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), unplugin.vite()],
});
```

or similarly in: Rollup, RSPack and esbuild thanks to [unplugin](https://github.com/unjs/unplugin)
