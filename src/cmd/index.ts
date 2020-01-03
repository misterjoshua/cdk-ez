import { Sade } from "sade";
import { buildCommand, buildLambdaCommand } from "./build";
import { lintCommand, lintExecCommand, lintFixCommand } from "./lint";
import { testCommand } from "./test";
import { initCommand } from "./init";
import { startCommand } from "./start";

export function registerCommands(prog: Sade): void {
  prog
    .command("build")
    .describe("It builds")
    .action(buildCommand);

  prog.command("build:lambda").action(buildLambdaCommand);

  prog
    .command("start")
    .describe("It watches and builds")
    .action(startCommand);

  prog
    .command("lint")
    .option("--fix", "Tells lint to fix files")
    .describe("it picks lint")
    .action(lintCommand);

  prog.command("lint:execute").action(lintExecCommand);
  prog.command("lint:fix").action(lintFixCommand);

  prog
    .command("test")
    .describe("it tests everything")
    .option(
      "--no-coverage",
      "Indicates that test coverage information should not be colelcted and reported in the output."
    )
    .option("--once", "Tests should run once only.")
    .action(testCommand);

  prog
    .command("init <projDir>")
    .option("--test", "test option")
    .describe("initializes a new project")
    .action(initCommand);

  // TODO: Support fractal project pattern.
  // TODO: Support .cdk-ez.config.ts
  // TODO: Eli wants "this isn't going to work" checks for user-specified customizations.
}
