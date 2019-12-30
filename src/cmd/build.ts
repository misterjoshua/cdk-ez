import { rollup } from 'rollup';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import { sync as globSync } from 'glob';
import ora from 'ora';
import Listr from 'listr';
// import path from 'path';

async function bundle(input: string): Promise<void> {
  const bundle = await rollup({
    input,
    plugins: [typescript({ lib: ['es6'], target: 'es6' }), resolve(), commonjs()],
  });

  await bundle.write({
    dir: 'dist',
    entryFileNames: '[name]/index.js',
    format: 'cjs',
  });
}

export async function buildCommand(): Promise<void> {
  const entries = globSync('./lambda/**.ts');

  try {
    const tasks = new Listr(
      entries.map((entry: string) => ({
        title: `${entry}`,
        task: (): Promise<void> => bundle(entry),
      })),
      {
        concurrent: true,
      },
    );

    const operation = new Listr([
      {
        title: 'Building lambdas',
        task: (): Listr => tasks,
      },
    ]);

    await operation.run();
  } catch (e) {
    console.error('Error ', e);
  }
}
