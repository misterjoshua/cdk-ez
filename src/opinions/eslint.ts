import { Linter } from 'eslint';

export async function getEslintConfig(): Promise<Linter.Config> {
  return {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'prettier'],
    rules: {
      'prettier/prettier': 'warn',
      '@typescript-eslint/no-unused-vars': 0,
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
    ],
  };
}

export async function getEslintPatterns(): Promise<string[]> {
  return ['./bin/**/*.ts', './lambda/**/*.ts', './lib/**/*.ts', './test/**/*.ts'];
}
