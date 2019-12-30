import { CLIEngine } from 'eslint';
import { getEslintOptions, getEslintPatterns } from '../opinions/eslint';

interface LintCommandOpts {
  fix?: boolean | undefined;
}

export const lintCommand = async (opt: LintCommandOpts): Promise<void> => {
  try {
    const engine = new CLIEngine(await getEslintOptions(!!opt.fix));
    const eslintPatterns = await getEslintPatterns();
    const formatter = engine.getFormatter();
    const report = engine.executeOnFiles(eslintPatterns);

    console.log(formatter(report.results));

    if (opt.fix) {
      console.info('Fixing the files.');
      CLIEngine.outputFixes(report);
    }
  } catch (e) {
    console.error(e);
  }
};
