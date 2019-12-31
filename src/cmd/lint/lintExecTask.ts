import { lintExec } from '../lintExec';
import { LintError } from './lintError';
import { TaskInfo, LintTaskFn } from './task';

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
