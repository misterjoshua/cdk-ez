import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import { preserveShebangs } from 'rollup-plugin-preserve-shebangs';

import tsconfig from './tsconfig.json';

export default {
  input: './src/index.ts',
  output: {
    dir: 'dist',
    entryFileNames: 'index.js',
    format: 'cjs',
  },
  external: [
    'sade',
    'rollup',
    '@rollup/plugin-commonjs',
    '@rollup/plugin-typescript',
    '@rollup/plugin-node-resolve',
    'glob',
    'listr',
    'path',
    'chokidar',
  ],
  plugins: [typescript(tsconfig.compilerOptions), json(), preserveShebangs()],
};
