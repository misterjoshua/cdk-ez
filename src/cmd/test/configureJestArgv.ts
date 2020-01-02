import { getJestConfig } from "../../opinions/jest";
import { TestCommandOpts } from "./index";

function testShouldWatch(opt: TestCommandOpts): boolean {
  return !process.env.CI && !opt.once;
}

export async function configureJestArgv(
  opt: TestCommandOpts
): Promise<string[]> {
  const jestConfig = await getJestConfig();
  const argv: string[] = ["--config", JSON.stringify(jestConfig)];

  if (!opt.noCoverage) {
    argv.push("--coverage");
  }

  if (testShouldWatch(opt)) {
    argv.push("--watch");
  }

  return argv;
}
