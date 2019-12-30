import { rollup } from 'rollup';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import { sync as globSync } from 'glob';
import ora from 'ora';

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

export async function build(): Promise<void> {
  const entries = globSync('./lambda/**.ts');

  const spinner = ora(`Bundling: ${entries.join(', ')}`).start();
  try {
    await Promise.all(entries.map((entry: string) => bundle(entry)));
    spinner.stop();
  } catch (e) {
    spinner.stop();
    console.error('Error ', e);
  }
}
