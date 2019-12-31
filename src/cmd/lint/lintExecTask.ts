import { lintExec } from '../lintExec';
import { TaskInfo, LintTaskFn, LintError } from './index';

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
