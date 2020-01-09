import { TestCommandOpts } from "./index";

function testShouldWatch(opt: TestCommandOpts): boolean {
  return !process.env.CI && !opt.once;
}

export async function configureJestArgv(
  opt: TestCommandOpts
): Promise<string[]> {
  const argv: string[] = [];

  if (!opt.noCoverage) {
    argv.push("--coverage");
  }

  if (testShouldWatch(opt)) {
    argv.push("--watch");
  }

  return argv;
}
