import { LintTaskContext } from "./lintTask";
import { CLIEngine } from "eslint";
import {
  receiveSubprocessCommand,
  sendSubprocessResult,
  getSubprocessCommandResult
} from "../../util/subprocessCommand";
import { addListrOutput, ListrOutputError } from "../../util/listrOutput";
import chalk from "chalk";
import figures from "figures";
import { ListrTaskWrapper } from "listr";

export interface LintExecCommandProps {
  patterns: string[];
  options: CLIEngine.Options;
}

export async function lintExecCommand(): Promise<void> {
  const props = await receiveSubprocessCommand<LintExecCommandProps>();
  const engine = new CLIEngine(props.options);
  const report = engine.executeOnFiles(props.patterns);
  await sendSubprocessResult(report);
}

export async function lintExec(
  patterns: string[],
  options: CLIEngine.Options
): Promise<CLIEngine.LintReport> {
  return await getSubprocessCommandResult<
    LintExecCommandProps,
    CLIEngine.LintReport
  >("lint:execute", {
    patterns: patterns,
    options: options
  });
}

export async function lintExecTask(
  ctx: LintTaskContext,
  task: ListrTaskWrapper
): Promise<void> {
  task.output = "Executing cdk-ez lint:execute subprocess";
  const report = await lintExec(ctx.patterns, ctx.eslintOptions);
  ctx.report = report;

  if (
    (!ctx.fix && report.errorCount > 0) ||
    (ctx.fix && report.errorCount > report.fixableErrorCount)
  ) {
    addListrOutput(
      ctx,
      chalk.redBright(`${figures.cross} Linting ${ctx.patterns.join(",")}`),
      ctx.formatter(report.results)
    );
    throw new ListrOutputError("There are linting errors", ctx);
  } else {
    addListrOutput(
      ctx,
      chalk.greenBright(`${figures.tick} Linted ${ctx.patterns.join(",")}`),
      ctx.formatter(report.results).trimLeft()
    );
  }
}
