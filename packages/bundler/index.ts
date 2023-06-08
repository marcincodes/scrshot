import { createUnplugin } from 'unplugin';
import path from 'path';
import { getConfigSync } from '@scrshot/helpers';
import * as recast from 'recast';
import * as esprima from 'recast/parsers/esprima.js';

interface PluginOptions {
  /**
   * Watch images 
   */
  watch?: boolean;

  /**
   * Strip components from production bundle
   */
  strip?: boolean;
};

const componentNames = [
  'ScrshotArea',
  'ScrshotDebug',
  'ScrshotMark',
  'ScrshotPreventScrolling'
];

const transformers = {
  react(code: string) {
    const ast = recast.parse(code, { parser: esprima });
  
    recast.visit(ast, {
      visitImportDeclaration(path) {
        if (path.node.source.value === "@scrshot/react") {
          path.prune();
          return false;
        }
        
        return false;
      },
      visitCallExpression(path) {
        const callee = path.node.callee as any;
        if (callee.name === "defineCustomElements") {
           path.prune();
           return false;
         }
         const args = path.node.arguments;

         for (const arg of args) {
          const _arg = arg as any;

          if (_arg.type === "Identifier" && componentNames.includes(_arg.name)) {
            _arg.type = 'Literal';
            _arg.value = 'div';
          }
         }
         
         this.traverse(path);
       },
    });
  
    return recast.print(ast);
  }
}

function hasScrshot(code: string) {
  if (!code) {
    return false;
  }

  return code.includes('@scrshot/');
}

function getFramework(code: string) {
  if (code.includes('@scrshot/react')) {
    return 'react';
  }

  return null;
}

export const unplugin = createUnplugin((options: PluginOptions = { watch: true, strip: true }) => {
  return {
    name: 'unplugin-scrshot',
    buildStart() {
      const { watch } = options;

      if (typeof watch !== 'undefined' && !watch) {
        // watching images not working in vite https://github.com/vitejs/vite/pull/13371
        // watching images not working in webpack
        const { config } = getConfigSync();

        for (const screenshot of Object.keys(config.screenshots)) {
          this.addWatchFile(path.resolve(process.cwd(), config.dest, `${screenshot}.png`))
        }
      }
    },
    transformInclude(id) {
      const { strip } = options;

      if (typeof strip !== 'undefined' && !strip) {
        return false;
      }

      const { ext, dir } = path.parse(id);

      if (dir.includes('node_modules')) {
        return false
      }

      return ['.tsx', '.jsx', '.js'].includes(ext);
    },
    transform(code) {
      if (process.env.NODE_ENV.startsWith('develop')) {
        return code;
      }

      const { strip } = options;

      if (typeof strip !== 'undefined' && !strip) {
        return code;
      }

      if (!hasScrshot(code)) {
        return code;
      }

      const framework = getFramework(code);

      switch(framework) {
        case 'react':
          return transformers.react(code);
        default:
          return code;
      }
    },
  }
})

// FAILING when uncommented
// export const vitePlugin = unplugin.vite
// export const rollupPlugin = unplugin.rollup
// export const webpackPlugin = unplugin.webpack
// export const rspackPlugin = unplugin.rspack
// export const esbuildPlugin = unplugin.esbuild
