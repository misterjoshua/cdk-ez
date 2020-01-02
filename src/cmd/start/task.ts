import { buildTask } from "../build";
import Listr from "listr";
import { ListrOutputContext } from "../../util/listrOutput";
import { testTask } from "../test/task";
import { lintTask } from "../lint/lintTask";

export function startTask(): Listr {
  return new Listr<ListrOutputContext>([
    {
      title: "Linting",
      task: (): Listr => {
        return lintTask({
          fix: false
        });
      }
    },
    {
      title: "Building",
      task: (): Listr => {
        return buildTask();
      }
    },
    {
      title: "Testing",
      task: (): Listr => {
        return testTask({
          once: true
        });
      }
    }
  ]);
}
