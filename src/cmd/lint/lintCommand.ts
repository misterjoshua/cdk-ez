import { CLIEngine } from "eslint";
import Listr from "listr";
import { getEslintPatterns } from "../../opinions/eslint";
import { lintFixTask } from "./lintFixTask";
import { lintExecTask } from "./lintExecTask";
import { LintError } from "./lintError";
import { TaskInfo, LintTaskCtx } from "./task";

interface LintCommandOpts {
  fix: boolean | undefined;
}

export async function lintCommand(opt: LintCommandOpts): Promise<void> {
  const fix = opt.fix as boolean;

  const eslintOptions = {
    fix
  };

  const taskInfo: TaskInfo = {
    eslintOptions: eslintOptions,
    formatter: new CLIEngine(eslintOptions).getFormatter(),
    patterns: await getEslintPatterns(),
    fix
  };

  try {
    const listr = new Listr<LintTaskCtx>([
      {
        title: `Linting ${taskInfo.patterns.join(", ")}`,
        task: lintExecTask(taskInfo)
      },
      {
        title: "Automatically fixing problems",
        enabled: (): boolean => taskInfo.fix,
        task: lintFixTask(taskInfo)
      }
    ]);

    const ctx = await listr.run();
    console.log(taskInfo.formatter(ctx.report.results));
  } catch (e) {
    if (e instanceof LintError) {
      console.log(taskInfo.formatter(e.report.results));
    } else {
      // console.log(e);
      throw e;
    }
    process.exit(1);
  }
}
