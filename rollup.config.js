import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import { preserveShebangs } from 'rollup-plugin-preserve-shebangs';

export default {
  input: './src/index.ts',
  output: {
    dir: 'dist',
    entryFileNames: 'index.js',
    format: 'cjs',
  },
  plugins: [typescript({ lib: ['es6'], target: 'es6' }), json(), preserveShebangs()],
};
