/* eslint-disable no-undef */
import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
import { dts } from 'rollup-plugin-dts';
import fs from 'fs';
import path from 'path';
const packagesDir = path.resolve(__dirname, 'packages');
const packageFiles = fs.readdirSync(packagesDir);

function output(path) {
  return [
    {
      input: [`./packages/${path}/src/index.ts`],
      output: [
        {
          file: `./packages/${path}/dist/index.cjs`,
          format: 'cjs',
          // sourcemap: true,
        },
        {
          file: `./packages/${path}/dist/index.mjs`,
          format: 'es',
          // sourcemap: true,
        },
        {
          file: `./packages/${path}/dist/index.iife.js`,
          format: 'iife',
          name: 'tracker',
          plugins: [uglify()],
        },
      ],
      plugins: [
        typescript({
          tsconfigOverride: {
            compilerOptions: {
              module: 'ESNext',
            },
          },
          useTsconfigDeclarationDir: true,
        }),
        resolve(),
        commonjs(),
      ],
    },
    {
      input: `./packages/${path}/src/index.ts`,
      output: [{ file: `./packages/${path}/dist/index.d.ts`, format: 'es' }],
      plugins: [dts()],
    },
  ];
}

export default [...packageFiles.map((path) => output(path)).flat()];
