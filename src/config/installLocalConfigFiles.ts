import { promisify } from "util";
import fs from "fs";
import { getTypescriptConfig } from "./default/typescript";
import {
  shouldAutoGenerateFile,
  createJsonFile,
  createIniFile,
  createModuleExportsFile
} from "./autoGenerate";
import { getEditorConfig } from "./default/editorconfig";
import { getJestConfig } from "./default/jest";

async function installTypescriptConfig(): Promise<void> {
  const tsconfig = "./tsconfig.json";

  if (await shouldAutoGenerateFile(tsconfig)) {
    const config = await getTypescriptConfig();
    const configFile = createJsonFile(config);
    await promisify(fs.writeFile)(tsconfig, configFile);
  }
}

async function installEditorConfig(): Promise<void> {
  const editorconfig = "./.editorconfig";

  if (await shouldAutoGenerateFile(editorconfig)) {
    const config = await getEditorConfig();
    const configFile = createIniFile(config);
    await promisify(fs.writeFile)(editorconfig, configFile);
  }
}

async function installJestConfig(): Promise<void> {
  const jestconfig = "./jest.config.js";

  if (await shouldAutoGenerateFile(jestconfig)) {
    const config = await getJestConfig();
    const configFile = createModuleExportsFile(JSON.stringify(config, null, 2));
    await promisify(fs.writeFile)(jestconfig, configFile);
  }
}

export async function installLocalConfig(): Promise<void> {
  await Promise.all([
    installTypescriptConfig(),
    installEditorConfig(),
    installJestConfig()
    //
  ]);
}
