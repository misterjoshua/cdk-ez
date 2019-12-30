import { rollup } from 'rollup';
import Listr from 'listr';
import { getRollupInputOptions, getRollupOutputOptions } from '../opinions/rollup';
import { getEntries } from '../opinions/entry';

async function bundle(input: string): Promise<void> {
  const build = await rollup(await getRollupInputOptions(input));
  build.write(await getRollupOutputOptions(input));
}

export async function buildCommand(): Promise<void> {
  const entries = await getEntries();

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
