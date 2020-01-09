import Listr from "listr";
import { getEntries } from "../../config/default/entry";
import * as listrOutput from "../../util/listrOutput";
import chalk from "chalk";
import figures from "figures";
import { buildLambda } from "./buildLambda";
import fse from "fs-extra";
import execa from "execa";
import { typeCheck } from "./typeCheck";

interface BuildContext extends listrOutput.ListrOutputContext {
  entries: string[];
}

async function getEntriesStep(ctx: BuildContext): Promise<void> {
  ctx.entries = await getEntries();
}

export async function buildDependencyLayer(ctx: BuildContext): Promise<void> {
  const distDir = "./dist/dependencies/nodejs";
  await fse.copy("./package.json", `${distDir}/package.json`);
  await fse.copy("./package-lock.json", `${distDir}/package-lock.json`);

  const result = await execa("npm", ["ci", "--only=prod"], {
    cwd: distDir
  });

  listrOutput.addListrOutput(
    ctx,
    chalk.greenBright("Dependencies layer"),
    result.stdout
  );
}

async function typeCheckStep(entry: string, ctx: BuildContext): Promise<void> {
  try {
    await typeCheck(entry);

    listrOutput.addListrOutput(
      ctx,
      chalk.greenBright(`${figures.tick} Type checked ${chalk.bold(entry)}`),
      ""
    );
  } catch (e) {
    listrOutput.addListrOutput(
      ctx,
      chalk.redBright(`${figures.cross} Type checking ${entry}`),
      e.message
    );
    throw new listrOutput.ListrOutputError(e.message, ctx);
  }
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
          `${figures.arrowRight} ${chalk.bold(output.emitted)}`
      ),
      output.output
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

function buildLambdasStep(topLevelBuildContext: BuildContext): Listr {
  const lambdaTasks = topLevelBuildContext.entries.map((entry: string) => ({
    title: `${entry}`,
    task: (): Listr => {
      return new Listr<BuildContext>(
        [
          {
            title: "Transpiling",
            task: async (): Promise<void> => {
              await buildLambdaStep(entry, topLevelBuildContext);
            }
          },
          {
            title: "Type checking",
            task: async (): Promise<void> => {
              await typeCheckStep(entry, topLevelBuildContext);
            }
          }
        ],
        {
          concurrent: true
        }
      );
    }
  }));

  const allTasks = [
    {
      title: `Dependencies layer`,
      task: async (): Promise<void> => {
        await buildDependencyLayer(topLevelBuildContext);
      }
    },
    ...lambdaTasks
  ];

  return new Listr(allTasks, { concurrent: true });
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
