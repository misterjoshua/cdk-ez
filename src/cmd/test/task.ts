import Listr, { ListrTaskWrapper } from "listr";
import execa from "execa";
import {
  addListrOutput,
  ListrOutputError,
  ListrOutputContext
} from "../../util/listrOutput";
import figures from "figures";
import chalk from "chalk";
import { configureJestArgv } from "./configureJestArgv";
import { TestCommandOpts } from "./index";

interface TestTaskContext extends ListrOutputContext {
  argv: string[];
}

function configureJestStep(opt: TestCommandOpts) {
  return async (ctx: TestTaskContext): Promise<void> => {
    ctx.argv = await configureJestArgv(opt);
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function runTestStep(
  ctx: TestTaskContext,
  task: ListrTaskWrapper
): Promise<void> {
  try {
    const subprocess = execa("jest", ctx.argv);
    const { stderr } = await subprocess;

    addListrOutput(
      ctx,
      chalk.greenBright(`${figures.tick} Tests passed`),
      stderr
    );
  } catch (e) {
    addListrOutput(
      ctx,
      chalk.redBright(`${figures.cross} Tests failed`),
      e.stderr
    );

    throw new ListrOutputError("Tests failed", ctx);
  }
}

export function testTask(opt: TestCommandOpts): Listr {
  const tasks: Listr.ListrTask[] = [
    {
      title: "Configuring test runner",
      task: configureJestStep(opt)
    },
    {
      title: "Running tests",
      task: runTestStep
    }
  ];

  return new Listr<TestTaskContext>(tasks);
}
