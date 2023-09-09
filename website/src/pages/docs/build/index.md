---
title: Introduction
description: Scrshot intro
layout: ~/layouts/DocLayout.astro
---

# Build plugins

Scrshot components meant to be used only in dev. That's why there is a need to introduce build plugins. Plugins that will remove Scrshot code from production bundle.

All these plugins are created using [unplugin](https://github.com/unjs/unplugin)

## Config

### watch

Watch screenshot images to notify dev server that they need to be hot reloaded on page

Default: `true`

### strip

When set to `false` components won't be removed from production build

Default: `true`


### Webpack

```js
import Scrshot from '@scrshot/build/webpack'

// webpack.config.js
module.exports = {
  plugins: [
    Scrshot()
  ],
}
```

### Vite

```js
import { defineConfig } from 'vite'
import Scrshot from '@scrshot/build/vite';

// vite.config.ts
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [Scrshot()],
})
```

### Next.js

```js
//next.config.js
const withScrshot = require('@scrshot/build/next')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = withScrshot(nextConfig)
```

### Rollup

```js
import Scrshot from '@scrshot/build/rollup'

// rollup.config.js
export default {
  plugins: [
    Scrshot(),
  ],
}
```

### esbuild

```js
// esbuild.config.js
import { build } from 'esbuild';
import Scrshot from '@scrshot/build/esbuild';

build({
  plugins: [
    Scrshot()
  ],
})
```

### Rspack

```js
import Scrshot from '@scrshot/build/rspack';

// rspack.config.js
module.exports = {
  plugins: [
    Scrshot(),
  ],
}
```
