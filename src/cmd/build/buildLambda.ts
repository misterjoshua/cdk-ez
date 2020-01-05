import { rollup } from "rollup";
import * as rollupOpinions from "../../config/default/rollup";
import {
  receiveSubprocessCommand,
  sendSubprocessResult,
  sendSubprocessCommandRaw
} from "../../util/subprocessCommand";
import { formatBuildLambdaException } from "./formatErrors";

interface BuildLambdaCommand {
  input: string;
}

export interface BuildLambdaOutput {
  emitted: string;
  output: string;
}

export async function buildLambda(input: string): Promise<BuildLambdaOutput> {
  const response = await sendSubprocessCommandRaw<BuildLambdaCommand>(
    "build:lambda",
    { input }
  );

  if (response.exitStatus !== 0) {
    throw new Error(response.stderr);
  }

  return {
    output: response.stderr,
    emitted: response.stdout
  };
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
    console.error(formatBuildLambdaException(e));
    sendSubprocessResult("Build did not succeed: " + e.message);
    process.exit(1);
  }
}
