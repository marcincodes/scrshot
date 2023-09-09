# @scrshot/build

## 0.2.0

### Minor Changes

- Release version 0.2.0

  This version contains breaking changes:

  - Renamed ScrshotPreventScrolling to ScrshotMask
  - Renamed package @scrshot/bundler to @scrshot/build

  Refactored CLI to not use license field. Remove redundant commands, and leftovers after refactor. Added output with simple properties to support making better screenshots.

### Patch Changes

- Updated dependencies
  - @scrshot/config@0.2.0

## 0.1.2

### Patch Changes

- Create build's name entrypoints for each build plugin

  Now you can use entrypoint to import code for particular build plugin.
  You can use `@scrshot/build/*` where `*` is one of following build name:

  - vite
  - webpack
  - rspack
  - rollup
  - esbuild

  Additionaly, you can use framework specific entrypoints:

  - next
  - nuxt

- Updated dependencies
  - @scrshot/config@0.1.2

## 0.1.1

### Patch Changes

- Minify files output for smaller bundle size
- Updated dependencies
  - @scrshot/config@0.1.1

## 0.1.0

### Minor Changes

- initial release
