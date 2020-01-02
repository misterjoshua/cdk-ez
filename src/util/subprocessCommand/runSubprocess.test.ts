import path from "path";
import { runSubprocess } from "./runSubprocess";

jest.setTimeout(5000);

it("gets the stdout, stderr, and exit code of the process", async () => {
  const { stdout, stderr, exitStatus } = await runSubprocess("node", [
    path.resolve(__dirname, "__test__", "run-get-outputs.js")
  ]);

  expect(stderr).toMatch(/stderr contents/);
  expect(stdout).toMatch(/stdout contents/);
  expect(exitStatus).toBe(111);
});

it("passes input to the given program and reads the output", async () => {
  const testString = "test string";
  const { stdout, stderr, exitStatus } = await runSubprocess(
    "node",
    [path.resolve(__dirname, "__test__", "run-parrot.js")],
    testString
  );

  expect(stderr).toBe("");
  expect(exitStatus).toBe(0);
  expect(stdout).toMatch(testString);
});
