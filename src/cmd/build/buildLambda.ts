import { rollup } from "rollup";
import * as rollupOpinions from "../../opinions/rollup";
import {
  receiveSubprocessCommand,
  sendSubprocessResult,
  sendSubprocessCommandRaw
} from "../../util/subprocessCommand";

interface BuildLambdaCommand {
  input: string;
}

export async function buildLambda(input: string): Promise<string> {
  const response = await sendSubprocessCommandRaw<BuildLambdaCommand>(
    "build:lambda",
    { input }
  );

  if (response.exitStatus !== 0) {
    throw new Error(response.stderr);
  }

  return JSON.parse(response.stdout) as string;
}

export async function buildLambdaCommand(): Promise<void> {
  try {
    const command = await receiveSubprocessCommand<BuildLambdaCommand>();

    const build = await rollup(
      await rollupOpinions.getRollupInputOptions(command.input)
    );
    const rollupOutput = await build.write(
      await rollupOpinions.getRollupOutputOptions(command.input)
    );

    sendSubprocessResult(rollupOutput.output.map(o => o.fileName).join(", "));
  } catch (e) {
    sendSubprocessResult("Build did not succeed: " + e.message);
    process.exit(1);
  }
}
