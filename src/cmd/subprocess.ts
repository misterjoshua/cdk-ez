import execa, { ExecaChildProcess } from 'execa';
import { readFile } from 'fs';
import { promisify } from 'util';

const channelCharacterEncoding = 'utf-8';
const channelFileDescriptor = 0;

/**
 * From the parent process.
 */

export async function sendSubprocessCommand<CommandType, ResultType>(
  command: string,
  message: CommandType,
): Promise<ResultType> {
  // Spawn the subprocess.
  const subprocess: ExecaChildProcess<string> = execa('cdk-ez', [command]);

  // Write to it
  subprocess.stderr?.pipe(process.stderr);
  subprocess.stdin?.write(JSON.stringify(message));
  subprocess.stdin?.end();

  // Wait for its output.
  const { stdout } = await subprocess;

  return JSON.parse(stdout);
}

/**
 * From the subprocess
 */

export async function receiveSubprocessCommandProps<CommandType>(): Promise<CommandType> {
  // Read the stdin for the command props
  const commandString = await promisify(readFile)(channelFileDescriptor, channelCharacterEncoding);
  return JSON.parse(commandString);
}

export async function sendSubprocessResponse<ResponseType>(response: ResponseType): Promise<void> {
  // Send the response by writing to stdout and closing it.
  process.stdout?.write(JSON.stringify(response));
  process.stdout?.end();
}
