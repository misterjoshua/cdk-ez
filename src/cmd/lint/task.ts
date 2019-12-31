import { CLIEngine } from 'eslint';
import Listr from 'listr';

export interface TaskInfo {
  eslintOptions: CLIEngine.Options;
  formatter: CLIEngine.Formatter;
  patterns: string[];
  fix: boolean;
}

export interface LintTaskCtx {
  report: CLIEngine.LintReport;
}

export type LintTaskFn = (
  ctx: LintTaskCtx,
  task: Listr.ListrTaskWrapper<LintTaskCtx>,
) => Listr.ListrTaskResult<LintTaskCtx>;
