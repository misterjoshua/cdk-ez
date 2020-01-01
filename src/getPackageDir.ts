import path from "path";

export function getPackageDir(...relative: string[]): string {
  const newLocal = path.resolve(__dirname, "..", ...relative);
  return newLocal;
}
