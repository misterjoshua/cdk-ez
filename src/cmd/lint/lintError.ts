import { CLIEngine } from 'eslint';
export class LintError extends Error {
  readonly report: CLIEngine.LintReport;
  constructor(message: string, report: CLIEngine.LintReport) {
    super(message);
    this.report = report;
  }
}
