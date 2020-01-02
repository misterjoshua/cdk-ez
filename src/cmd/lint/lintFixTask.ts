import { LintTaskContext } from "./lintTask";
import { CLIEngine } from "eslint";
import {
  receiveSubprocessCommand,
  sendSubprocessResult,
  getSubprocessCommandResult
} from "../../util/subprocessCommand";
import { ListrTaskWrapper } from "listr";

export interface LintFixCommandProps {
  report: CLIEngine.LintReport;
}

export async function lintFixCommand(): Promise<void> {
  const props = await receiveSubprocessCommand<LintFixCommandProps>();
  CLIEngine.outputFixes(props.report);
  await sendSubprocessResult({});
}

export async function lintFix(report: CLIEngine.LintReport): Promise<void> {
  return await getSubprocessCommandResult<LintFixCommandProps, void>(
    "lint:fix",
    {
      report: report
    }
  );
}

export async function lintFixTask(
  ctx: LintTaskContext,
  task: ListrTaskWrapper
): Promise<void> {
  task.output = "Executing cdk-ez lint:fix subprocess";
  await lintFix(ctx.report);
}
