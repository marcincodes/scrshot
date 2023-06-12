import plugin from './webpack';
import { Options } from "./types"

export default (options: Options = {}) => (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config) {
      config.plugins.push(plugin(options))

      return config
    },
  });
}
