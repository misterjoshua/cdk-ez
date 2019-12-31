import { InputOptions, OutputOptions } from 'rollup';
import typescript, { RollupTypescriptOptions } from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

export const getRollupTypescriptOptions = async (input: string): Promise<RollupTypescriptOptions> => {
  return { lib: ['es6'], target: 'es6', tsconfig: './tsconfig.json' };
};

export const getRollupInputOptions = async (input: string): Promise<InputOptions> => {
  const typescriptOptions = await getRollupTypescriptOptions(input);

  return {
    input,
    plugins: [typescript(typescriptOptions), resolve(), commonjs()],
  };
};

export const getRollupOutputOptions = async (input: string): Promise<OutputOptions> => {
  return {
    dir: 'dist',
    entryFileNames: '[name]/index.js',
    format: 'cjs',
  };
};
