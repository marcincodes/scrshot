export default {
  entries: [
    './index'
  ],
  declaration: true,
  failOnWarn: false,
  rollup: {
    inlineDependencies: false,
    emitCJS: true,
  },
}
