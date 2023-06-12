# Scrshot

Package containing bundlers plugin for [Scrshot](https://scrshot.dev/).

## Installation

You can install them from npm package registry:

Using npm:

```bash
npm install @scrshot/bundler
```

Using yarn:

```bash
yarn add @scrshot/bundler
```

Using pnpm:

```bash
pnpm add @scrshot/bundler
```

## Usage

You can use bundler plugin in most bundlers on the market and many frameworks.

Usage with frameworks:

### Next
```js
// next.config.js
const withScrshot = require('@scrshot/bundler/next')({ /* options */ });

module.exports = withScrshot({ /* next config */ })
```
### Nuxt

```js
// nuxt.config.js
export default {
  buildModules: [
    ['@scrshot/bundler/nuxt', { /* options */ }],
  ],
}
```

Usage with bundlers:

### Vite

```ts
// vite.config.ts
import Scrshot from '@scrshot/bundler/vite'

export default defineConfig({
  plugins: [
    Scrshot({ /* options */ }),
  ],
})
```

### Webpack

```js
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('@scrshot/bundler/webpack')({ /* options */ })
  ]
}
```

### Rollup

```js
// rollup.config.js
import Scrshot from '@scrshot/bundler/rollup'

export default {
  plugins: [
    Scrshot({ /* options */ }),
  ],
}
```

### Esbuild

```js
// esbuild.config.js
import { build } from 'esbuild'
import Scrshot from '@scrshot/bundler/esbuild'

build({
  plugins: [Scrshot({ /* options */ })],
})
```

### Rspack

```js
// rspack.config.js

module.exports = {
  plugins: [require('@scrshot/bundler/rspack')({ /* options */ })],
};
```

## Options


### `strip`
Default: `true`

Set to `false` to leave scrshot components in codebase

### `watch`
Default: `true`

Set to `false` to tell bundler to not watch screenshot files. 

**Warning**
For now this is not supported in any bundler.


## License

All rights reserved
