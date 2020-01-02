import { CLIEngine } from "eslint";
import Listr from "listr";
import { ListrOutputContext } from "../../util/listrOutput";
import { getEslintPatterns } from "../../opinions/eslint";
import { lintExecTask } from "./lintExecTask";
import { lintFixTask } from "./lintFixTask";
import { LintCommandOpts } from "./lintCommand";

export interface LintTaskContext extends ListrOutputContext {
  report: CLIEngine.LintReport;
  eslintOptions: CLIEngine.Options;
  formatter: CLIEngine.Formatter;
  patterns: string[];
  fix: boolean;
}

function lintSetupTask(opt: LintCommandOpts) {
  return async (ctx: LintTaskContext): Promise<void> => {
    const fix = opt.fix as boolean;
    const eslintOptions = {
      fix
    };

    ctx.eslintOptions = eslintOptions;
    ctx.formatter = new CLIEngine(eslintOptions).getFormatter();
    ctx.patterns = await getEslintPatterns();
    ctx.fix = fix;
  };
}

export function lintTask(opt: LintCommandOpts): Listr<LintTaskContext> {
  return new Listr<LintTaskContext>([
    {
      title: "Configuring eslint",
      task: lintSetupTask(opt)
    },
    {
      title: "Running lint",
      task: lintExecTask
    },
    {
      title: "Automatically fixing problems",
      skip: (ctx): boolean => !ctx.fix,
      task: lintFixTask
    }
  ]);
}
