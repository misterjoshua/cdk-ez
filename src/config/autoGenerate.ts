import { promisify } from 'util';
import fs from 'fs';

const autoGeneratedString = `AUTOGENERATED-BY-CDK-EZ`;

const autoGeneratedMessage = [
  autoGeneratedString,
  '',
  'To modify this file, please consider creating a .cdk-ez.config.ts file and',
  'use hooks to override cdk-ez opinions so that we can maximize forward',
  'compatibility. Otherwise, remove this message all references to this string:',
  '',
  autoGeneratedString,
];

export function createJsonFile(jsonObject: object): string {
  return JSON.stringify(
    {
      '0-cdk-ez-message': autoGeneratedMessage,
      ...jsonObject,
    },
    null,
    2,
  );
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
