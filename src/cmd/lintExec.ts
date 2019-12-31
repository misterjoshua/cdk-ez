import { CLIEngine } from 'eslint';
import { receiveSubprocessCommandProps, sendSubprocessResponse, sendSubprocessCommand } from './subprocess';

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
