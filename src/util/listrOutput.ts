import chalk from "chalk";
import Listr from "listr";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ListrOutputContext {
  output: ListrOutput[];
}

export interface ListrOutput {
  title: string;
  output: string;
}

export class ListrOutputError extends Error {
  ctx: ListrOutputContext;
  constructor(message: string, ctx: ListrOutputContext) {
    super(message);
    this.ctx = ctx;
  }
}

export function addListrOutput(
  ctx: ListrOutputContext,
  name: string,
  output: string
): void {
  ctx.output = ctx.output || [];

  const listrOutput: ListrOutput = {
    title: name,
    output
  };

  ctx.output.push(listrOutput);
}

export function getListrOutput(ctx: ListrOutputContext): ListrOutput[] {
  return ctx.output || [];
}

function formatListrOutput(output: ListrOutput): string {
  return (
    chalk.underline(`${output.title}`) +
    //
    (output.output ? `\n\n${output.output.trim()}\n` : "\n")
  );
}

export function formatListrOutputContext(ctx: ListrOutputContext): string {
  return (
    "\n" +
    getListrOutput(ctx)
      .map(output => formatListrOutput(output))
      .join("\n")
  );
}

export async function runListrOutputTaskList(
  task: Listr<ListrOutputContext>
): Promise<void> {
  try {
    const ctx = await task.run();
    console.log(formatListrOutputContext(ctx));
  } catch (e) {
    if (e instanceof ListrOutputError) {
      console.error(formatListrOutputContext(e.ctx));
    } else {
      throw e;
    }
  }
}
