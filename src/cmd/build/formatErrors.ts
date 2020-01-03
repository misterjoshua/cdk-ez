import { RollupError } from "rollup";
import chalk from "chalk";

export function formatRollupError(err: RollupError): string {
  const lines: string[] = [];

  const writeError = (errString: string): void => {
    lines.push(errString);
  };

  writeError(chalk.redBright(err.message || err));

  if (err.url) {
    writeError(chalk.cyan(err.url));
  }

  if (err.loc) {
    writeError(`${err.loc.file} (${err.loc.line}:${err.loc.column})`);
  }

  if (err.frame) {
    writeError(chalk.dim(err.frame));
  }

  if (err.stack) {
    writeError(chalk.dim(err.stack));
  }

  writeError("");

  return lines.join("\n");
}

export function formatBuildLambdaException(e: Error): string {
  const rollupError: RollupError = e;
  if (rollupError.code) {
    return formatRollupError(e);
  } else {
    return String(e);
  }
}
