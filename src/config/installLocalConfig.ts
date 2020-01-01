import { promisify } from "util";
import fs from "fs";
import { getTypescriptConfig } from "../opinions/typescript";
import { shouldAutoGenerateFile, createJsonFile } from "./autoGenerate";

async function installTypescriptConfig(): Promise<void> {
  const tsconfig = "./tsconfig.json";

  if (await shouldAutoGenerateFile(tsconfig)) {
    const config = await getTypescriptConfig();
    const configFile = createJsonFile(config);
    await promisify(fs.writeFile)(tsconfig, configFile);
  }
}

export async function installLocalConfig(): Promise<void> {
  await Promise.all([
    installTypescriptConfig()
    //
  ]);
}
