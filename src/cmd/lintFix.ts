import { CLIEngine } from 'eslint';
import { receiveSubprocessCommandProps, sendSubprocessResponse, sendSubprocessCommand } from './subprocess';

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
