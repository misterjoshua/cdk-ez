import { CLIEngine } from 'eslint';
import { getEslintOptions, getEslintPatterns } from '../opinions/eslint';

export const lintCommand = async (): Promise<void> => {
  try {
    const engine = new CLIEngine(await getEslintOptions());
    const eslintPatterns = await getEslintPatterns();
    const formatter = engine.getFormatter();
    const report = engine.executeOnFiles(eslintPatterns);
    console.log(formatter(report.results));
  } catch (e) {
    console.error(e);
  }
};
