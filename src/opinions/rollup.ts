import { InputOptions, OutputOptions } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

export const getRollupInputOptions = async (input: string): Promise<InputOptions> => {
  return {
    input,
    plugins: [typescript({ lib: ['es6'], target: 'es6' }), resolve(), commonjs()],
  };
};

export const getRollupOutputOptions = async (input: string): Promise<OutputOptions> => {
  return {
    dir: 'dist',
    entryFileNames: '[name]/index.js',
    format: 'cjs',
  };
};
