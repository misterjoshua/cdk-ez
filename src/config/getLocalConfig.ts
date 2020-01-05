import fse from "fs-extra";
import ts from "typescript";
import path from "path";

function getConfigPath(): string {
  return path.join(process.cwd(), "cdk-ez.config.ts");
}

export type LocalConfigHook<Type> = (input: Type) => Promise<Type>;

export async function hasLocalConfig(): Promise<boolean> {
  try {
    const stat = await fse.stat(getConfigPath());
    return stat.isFile();
  } catch (err) {
    return false;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let localProjectConfig: any = undefined;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getLocalConfig(): Promise<any> {
  if (localProjectConfig !== undefined) return localProjectConfig;

  try {
    if (!(await hasLocalConfig())) return undefined;

    const fileName = getConfigPath();
    const config = await fse.readFile(fileName);
    const output = ts.transpileModule(config.toString(), {
      fileName
    });

    const fn = new Function(`
let exports = {};
${output.outputText}
return exports;
`);

    localProjectConfig = fn();
    return localProjectConfig;
  } catch (err) {
    console.error(err.message);
    return undefined;
  }
}

export async function getLocalConfigHook<Type>(
  name: string
): Promise<LocalConfigHook<Type>> {
  const localConfig = await getLocalConfig();

  if (localConfig instanceof Object && localConfig[name]) {
    return localConfig[name];
  } else {
    return async (options: Type): Promise<Type> => options;
  }
}
