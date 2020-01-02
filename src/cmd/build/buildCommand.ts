import { buildTask } from "./task";
import { runListrOutputTaskList } from "../../util/listrOutput";

export async function buildCommand(): Promise<void> {
  runListrOutputTaskList(buildTask());
}
