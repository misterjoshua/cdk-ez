import { promisify } from "util";
import fs from "fs";

const autoGeneratedString = `AUTOGENERATED-BY-CDK-EZ`;

const autoGeneratedMessage = [
  autoGeneratedString,
  "",
  "To modify this file, please consider creating a .cdk-ez.config.ts file and",
  "use hooks to override cdk-ez opinions so that we can maximize forward",
  "compatibility. Otherwise, remove this message and all references to this",
  "string:",
  "",
  autoGeneratedString
];

export function createJsonFile(jsonObject: object): string {
  return JSON.stringify(
    {
      "0-cdk-ez-message": autoGeneratedMessage,
      ...jsonObject
    },
    null,
    2
  );
}

export interface IniSection {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
}
export interface IniFile {
  [x: string]: IniSection;
}

export function createIniFile(iniFile: IniFile): string {
  const createStatementLines = (section: IniSection): string[] =>
    Object.entries(section)
      .filter(([, value]) => value !== undefined)
      .map(([name, value]) => `${name} = ${value}`);

  const createSections = (iniFile: IniFile): string[] =>
    Object.entries(iniFile).map(([section, statements]) => {
      return `[${section}]\n${createStatementLines(statements).join("\n")}`;
    });

  return `
; ${autoGeneratedMessage.join("\n; ")}
${createSections(iniFile).join("\n")}
`.trimLeft();
}

export async function shouldAutoGenerateFile(file: string): Promise<boolean> {
  try {
    await promisify(fs.stat)(file);
  } catch {
    // File does not exist, so let's generate it.
    return true;
  }

  const fileContents = (await promisify(fs.readFile)(file)).toString();
  if (fileContents.search(autoGeneratedString) >= 0) {
    return true;
  } else {
    return false;
  }
}
