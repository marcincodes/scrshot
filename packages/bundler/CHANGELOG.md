# @scrshot/bundler

## 0.1.2

### Patch Changes

- Create bundler's name entrypoints for each bundler

  Now you can use entrypoint to import code for particular bundler plugin.
  You can use `@scrshot/bundler/*` where `*` is one of following bundler name:

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
