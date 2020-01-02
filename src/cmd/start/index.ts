import * as chokidar from "chokidar";
import { runListrOutputTaskList } from "../../util/listrOutput";
import { startTask } from "./task";

let building = false;
async function onChange(): Promise<void> {
  if (!building) {
    building = true;
    try {
      await runListrOutputTaskList(startTask());
    } catch (e) {
      console.error("Build failed for an unexpected reason", e);
    } finally {
      building = false;
    }
  }
}

export async function startCommand(): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chokidarWatch = (chokidar as any).watch;

  const watcher = chokidarWatch(["lib", "lambda", "test"]);
  watcher.on("all", onChange);
}
