import { lintTask } from "./lintTask";
import { runListrOutputTaskList } from "../../util/listrOutput";

export interface LintCommandOpts {
  fix: boolean | undefined;
}

export async function lintCommand(opt: LintCommandOpts): Promise<void> {
  const task = await lintTask(opt);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await runListrOutputTaskList(task as any);
}
