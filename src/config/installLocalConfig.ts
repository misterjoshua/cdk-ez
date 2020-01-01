import { promisify } from "util";
import fs from "fs";
import { getTypescriptConfig } from "../opinions/typescript";
import {
  shouldAutoGenerateFile,
  createJsonFile,
  createIniFile
} from "./autoGenerate";
import { getEditorConfig } from "../opinions/editorconfig";

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

export async function installLocalConfig(): Promise<void> {
  await Promise.all([
    installTypescriptConfig(),
    installEditorConfig()
    //
  ]);
}
