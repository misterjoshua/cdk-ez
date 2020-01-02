import Listr from "listr";
import { getEntries } from "../../opinions/entry";
import * as listrOutput from "../../util/listrOutput";
import chalk from "chalk";
import figures from "figures";
import { buildLambda } from "./buildLambda";

interface BuildContext extends listrOutput.ListrOutputContext {
  entries: string[];
}

async function getEntriesStep(ctx: BuildContext): Promise<void> {
  ctx.entries = await getEntries();
}

async function buildLambdaStep(
  entry: string,
  ctx: BuildContext
): Promise<void> {
  try {
    const output = await buildLambda(entry);
    listrOutput.addListrOutput(
      ctx,
      chalk.greenBright(
        `${figures.tick} Built ${chalk.bold(entry)} ` +
          `${figures.arrowRight} ${chalk.bold(output)}`
      ),
      ""
    );
  } catch (e) {
    listrOutput.addListrOutput(
      ctx,
      chalk.redBright(`${figures.cross} Building ${entry}`),
      e.message
    );
    throw new listrOutput.ListrOutputError(e.message, ctx);
  }
}

function buildLambdasStep(ctx: BuildContext): Listr {
  return new Listr(
    ctx.entries.map((entry: string) => ({
      title: `${entry}`,
      task: async (): Promise<void> => {
        await buildLambdaStep(entry, ctx);
      }
    })),
    {
      concurrent: true
    }
  );
}

export function buildTask(): Listr {
  return new Listr<BuildContext>([
    {
      title: "Getting entries",
      task: getEntriesStep
    },
    {
      title: "Building lambdas",
      task: buildLambdasStep
    }
  ]);
}
