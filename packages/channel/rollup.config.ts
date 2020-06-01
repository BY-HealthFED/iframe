import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import dts from 'rollup-plugin-dts';
import pkg from './package.json';

const moduleName = 'BY_HEALTH.Channel';
const entryFile = 'src/index.ts';

export default [
  {
    input: entryFile,
    output: [
      // CommonJS (for Node) build
      {
        format: 'cjs',
        file: pkg.main,
        exports: 'named',
      },

      // ES module (for bundlers) build
      {
        format: 'esm',
        file: pkg.module,
      },
    ],

    plugins: [
      typescript({
        target: 'es5',
      }),
    ],
  },

  {
    input: entryFile,
    output: [
      // browser-friendly UMD build
      {
        format: 'umd',
        file: pkg.browser,
        name: moduleName,
      },
    ],
    plugins: [
      nodeResolve({
        browser: true,
      }),
      commonjs(),
      typescript({
        target: 'es5',
      }),
      terser(),
    ],
  },

  {
    input: entryFile,
    output: [
      {
        format: 'es',
        file: pkg.types,
      },
    ],
    plugins: [dts()],
  },
];
