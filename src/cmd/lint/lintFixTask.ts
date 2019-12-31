import { TaskInfo, LintTaskFn } from './task';
import { CLIEngine } from 'eslint';
import { receiveSubprocessCommandProps, sendSubprocessResponse, sendSubprocessCommand } from '../subprocessCommand';

export interface LintFixCommandProps {
  report: CLIEngine.LintReport;
}

export async function lintFixCommand(): Promise<void> {
  const props = await receiveSubprocessCommandProps<LintFixCommandProps>();
  CLIEngine.outputFixes(props.report);
  await sendSubprocessResponse({});
}

export async function lintFix(report: CLIEngine.LintReport): Promise<void> {
  return await sendSubprocessCommand<LintFixCommandProps, void>('lint:fix', {
    report: report,
  });
}

export function lintFixTask(_taskInfo: TaskInfo): LintTaskFn {
  return async (ctx, task): Promise<void> => {
    task.output = 'Executing cdk-ez lint:fix subprocess';
    await lintFix(ctx.report);
  };
}
