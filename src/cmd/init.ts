import fse from "fs-extra";
import { getPackageDir } from "../getPackageDir";
import execa from "execa";
import Listr from "listr";
import { getRecommendedVersion } from "../getVersion";

async function patchPackageJsonCdkEzVersion(
  packageJson: string
): Promise<void> {
  const pkgJson = await (await fse.readFile(packageJson)).toString();

  const version = "^" + getRecommendedVersion();
  const patchedPkgJson = pkgJson.replace(
    '"cdk-ez": "*"',
    `"cdk-ez": "${version}"`
  );

  await fse.writeFile(packageJson, patchedPkgJson);
}

export function initTask(projDir: string): Listr {
  const templatePath = getPackageDir("template");

  return new Listr([
    {
      title: "Creating project from template",
      task: async (): Promise<void> => {
        await fse.copy(templatePath, projDir);
        await patchPackageJsonCdkEzVersion(`${projDir}/package.json`);
      }
    },
    {
      title: "Installing dependencies",
      task: async (_ctx, task): Promise<void> => {
        task.output = "npm i";
        await execa("npm", ["i"], {
          cwd: projDir
        });
      }
    },
    {
      title: "Running initial build",
      task: async (_ctx, task): Promise<void> => {
        task.output = "npm run build";
        await execa("npm", ["run", "build"], {
          cwd: projDir
        });
      }
    }
  ]);
}

export async function initCommand(projDir: string): Promise<void> {
  await initTask(projDir).run();
}
