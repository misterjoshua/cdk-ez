import execa from "execa";

export interface SubprocessResult {
  stdout: string;
  stderr: string;
  exitStatus: number;
}

export async function runSubprocess(
  cmd: string,
  args: string[],
  input: undefined | string = undefined
): Promise<SubprocessResult> {
  try {
    const subprocess = execa(cmd, args);

    if (input !== undefined && subprocess.stdin?.writable) {
      subprocess.stdin.write(input);
      subprocess.stdin.end();
    }

    const res = await subprocess;

    return {
      stderr: res.stderr,
      stdout: res.stdout,
      exitStatus: res.exitCode
    };
  } catch (e) {
    return {
      stderr: e.stderr,
      stdout: e.stdout,
      exitStatus: e.exitCode
    };
  }
}
