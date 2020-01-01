import Listr from "listr";

export async function runTask(listr: Listr): Promise<void> {
  await listr.run();
}
