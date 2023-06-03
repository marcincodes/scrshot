import { createUnplugin } from 'unplugin';
import path from 'path';
import { getConfigSync } from '@scrshot/helpers';

interface UserOptions {}

const extensions = {
  react: ['tsx', 'jsx'],
  vue: ['vue']
}

function isReact(id, code) {
  
}

export const unplugin = createUnplugin((options: UserOptions) => {
  return {
    name: 'unplugin-scrshot',
    buildStart() {
      // watching images not working in vite https://github.com/vitejs/vite/pull/13371
      // watching images not working in webpack
      const { config } = getConfigSync();

      for (const screenshot of Object.keys(config.screenshots)) {
        this.addWatchFile(path.resolve(process.cwd(), config.dest, `${screenshot}.png`))
      }
    },
    // transformInclude(id) {
    //   return id.endsWith('.tsx')
    // },
    transform(code, id) {
      console.log(code);
      // console.log(this.parse(code)) // acorn parsing
    // Partially working
    //   const mod = parseModule(code);

    //   if (mod.imports.ScrshotArea) delete mod.imports.ScrshotArea;
    //   if (mod.imports.ScrshotDebug) delete mod.imports.ScrshotDebug;

    //   // if (mod.imports.defineCustomElements) delete mod.imports.defineCustomElements;

    //   return mod.generate().code
    //     .replace(/jsx\(ScrshotArea/, 'jsx("div"')
    //     .replace('/* @__PURE__ */ jsx(ScrshotDebug, {})', '')
    //     .replace('defineCustomElements();', '');

      return code;
    },
  }
})

export const vitePlugin = unplugin.vite
export const rollupPlugin = unplugin.rollup
export const webpackPlugin = unplugin.webpack
export const rspackPlugin = unplugin.rspack
export const esbuildPlugin = unplugin.esbuild
