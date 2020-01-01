import temp from "temp";
import { initCommand } from "../src/cmd/init";
import fs from "fs";
import execa from "execa";

jest.setTimeout(300000); // Wait a really long time for this task. It's slow.

it("inits a new project ", async () => {
  const tmpDir = temp.mkdirSync();
  const projDir = `${tmpDir}/init`;

  await initCommand(projDir);

  expect(fs.statSync(projDir).isDirectory()).toBe(true);

  const packageJsonPath = `${projDir}/package.json`;
  expect(fs.statSync(packageJsonPath).isFile()).toBe(true);

  const pkg = JSON.parse(fs.readFileSync(packageJsonPath).toString());

  expect(pkg).toEqual(
    expect.objectContaining({
      devDependencies: expect.objectContaining({
        "cdk-ez": expect.any(String)
      }),
      eslintConfig: expect.objectContaining({
        extends: "cdk-ez"
      })
    })
  );

  const execaProj = (
    cmd: string,
    args: string[]
  ): Promise<execa.ExecaReturnValue> => execa(cmd, args);

  expect(fs.statSync(`${projDir}/node_modules`).isDirectory()).toBe(true);

  await execaProj("npm", ["run", "lint:fix"]);
  await execaProj("npm", ["run", "test"]);
  await execaProj("npm", ["run", "build"]);

  expect(fs.statSync(`${projDir}/dist`).isDirectory()).toBe(true);
});
