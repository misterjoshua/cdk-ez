import jest from "jest";
import { getJestConfig } from "../opinions/jest";

interface TestCommandOpts {
  noCoverage: boolean | undefined;
  once: boolean | undefined;
}

function testShouldWatch(opt: TestCommandOpts): boolean {
  return !process.env.CI && !opt.once;
}

export async function testCommand(opt: TestCommandOpts): Promise<void> {
  const jestConfig = await getJestConfig();
  const argv: string[] = ["--config", JSON.stringify(jestConfig)];

  if (!opt.noCoverage) {
    argv.push("--coverage");
  }

  if (testShouldWatch(opt)) {
    argv.push("--watch");
  }

  await jest.run(argv);
}
