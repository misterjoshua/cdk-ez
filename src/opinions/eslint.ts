export async function getEslintPatterns(): Promise<string[]> {
  return [
    "./bin/**/*.ts",
    "./lambda/**/*.ts",
    "./lib/**/*.ts",
    "./test/**/*.ts"
  ];
}
