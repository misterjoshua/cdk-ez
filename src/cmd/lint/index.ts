import { CLIEngine } from 'eslint';
import Listr from 'listr';
import { lintCommand } from './lintCommand';

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

export class LintError extends Error {
  readonly report: CLIEngine.LintReport;
  constructor(message: string, report: CLIEngine.LintReport) {
    super(message);
    this.report = report;
  }
}

export { lintCommand };
