import jest from "jest";
import { configureJestArgv } from "./configureJestArgv";

export interface TestCommandOpts {
  noCoverage?: boolean | undefined;
  once: boolean | undefined;
}

export async function testCommand(opt: TestCommandOpts): Promise<void> {
  await jest.run(await configureJestArgv(opt));
}
