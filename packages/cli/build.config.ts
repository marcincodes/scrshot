import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['src/index'],
  declaration: true,
  rollup: {
    inlineDependencies: true,
    esbuild: {
      minify: true,
    },
    emitCJS: true
  }
})
