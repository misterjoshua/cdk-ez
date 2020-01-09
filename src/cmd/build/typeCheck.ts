import {
  sendSubprocessCommandRaw,
  receiveSubprocessCommand,
  sendSubprocessResult
} from "../../util/subprocessCommand";
import execa from "execa";

interface TypeCheckProps {
  entry: string;
}

interface TypeCheckResult {
  messages: string;
  warnings: string;
}

export async function typeCheck(entry: string): Promise<TypeCheckResult> {
  const response = await sendSubprocessCommandRaw<TypeCheckProps>(
    "build:typeCheck",
    { entry }
  );

  if (response.exitStatus !== 0) {
    throw new Error(response.stderr);
  }

  return {
    messages: response.stdout,
    warnings: response.stderr
  };
}

export async function typeCheckCommand(): Promise<void> {
  const command = await receiveSubprocessCommand<TypeCheckProps>();

  try {
    await execa("tsc", ["--noEmit", command.entry]);
    process.exit(0);
  } catch (err) {
    console.error(err);
    await sendSubprocessResult(
      `Type checking ${command.entry} did not succeed`
    );
    process.exit(1);
  }
}
