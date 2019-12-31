import { lintFix } from '../lintFix';
import { TaskInfo, LintTaskFn } from './task';

export function lintFixTask(_taskInfo: TaskInfo): LintTaskFn {
  return async (ctx, task): Promise<void> => {
    task.output = 'Executing cdk-ez lint:fix subprocess';
    await lintFix(ctx.report);
  };
}
