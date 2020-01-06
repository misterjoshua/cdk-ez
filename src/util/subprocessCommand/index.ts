import { readFile } from "fs";
import { promisify } from "util";
import { runSubprocess, SubprocessResult } from "./runSubprocess";

const channelCharacterEncoding = "utf-8";
const channelFileDescriptor = 0;

/**
 * From the parent process.
 */

export async function sendSubprocessCommandRaw<CommandType>(
  command: string,
  message: CommandType
): Promise<SubprocessResult> {
  return await runSubprocess("cdk-ez", [command], JSON.stringify(message));
}

export async function getSubprocessCommandResult<CommandType, ResultType>(
  command: string,
  message: CommandType
): Promise<ResultType> {
  const { stdout, stderr, exitStatus } = await sendSubprocessCommandRaw(
    command,
    message
  );

  if (exitStatus !== 0) {
    throw new Error(`Subprocess failed:\n${stderr}`);
  }

  try {
    return JSON.parse(stdout);
  } catch (err) {
    throw new Error(
      `Could not parse lint subprocess result: ${err.message}\n==> STDOUT:\n${stdout}\n==> STDERR:\n${stderr}`
    );
  }
}

/**
 * From the subprocess
 */

export async function receiveSubprocessCommand<CommandType>(): Promise<
  CommandType
> {
  // Read the stdin for the command props
  const commandString = await promisify(readFile)(
    channelFileDescriptor,
    channelCharacterEncoding
  );
  return JSON.parse(commandString);
}

export async function sendSubprocessResult<ResponseType>(
  response: ResponseType
): Promise<void> {
  // Send the response by writing to stdout and closing it.
  process.stdout?.write(JSON.stringify(response));
  process.stdout?.end();
}
