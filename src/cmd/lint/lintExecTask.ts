import { LintError } from './lintError';
import { TaskInfo, LintTaskFn } from './task';
import { CLIEngine } from 'eslint';
import { receiveSubprocessCommandProps, sendSubprocessResponse, sendSubprocessCommand } from '../subprocessCommand';

export interface LintExecCommandProps {
  patterns: string[];
  options: CLIEngine.Options;
}

export async function lintExecCommand(): Promise<void> {
  const props = await receiveSubprocessCommandProps<LintExecCommandProps>();
  const engine = new CLIEngine(props.options);
  const report = engine.executeOnFiles(props.patterns);
  await sendSubprocessResponse(report);
}

export async function lintExec(patterns: string[], options: CLIEngine.Options): Promise<CLIEngine.LintReport> {
  return await sendSubprocessCommand<LintExecCommandProps, CLIEngine.LintReport>('lint:execute', {
    patterns: patterns,
    options: options,
  });
}

export function lintExecTask(taskInfo: TaskInfo): LintTaskFn {
  return async (_ctx, task): Promise<void> => {
    task.output = 'Executing cdk-ez lint:execute subprocess';
    const report = await lintExec(taskInfo.patterns, taskInfo.eslintOptions);

    if (!taskInfo.fix && report.errorCount > 0) {
      throw new LintError('There are linting errors.', report);
    } else if (taskInfo.fix && report.errorCount > report.fixableErrorCount) {
      throw new LintError('There are linting errors.', report);
    }

    _ctx.report = report;
  };
}
