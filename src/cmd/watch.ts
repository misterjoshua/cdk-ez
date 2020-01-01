import * as chokidar from "chokidar";
import { buildCommand } from "./build";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const chokidarWatch = (chokidar as any).watch;

let building = false;
async function onChange(): Promise<void> {
  if (!building) {
    building = true;
    try {
      await buildCommand();
    } finally {
      building = false;
    }
  }
}

export async function watchCommand(): Promise<void> {
  const watcher = chokidarWatch(["lib", "lambda"]);
  watcher.on("all", onChange);
}
