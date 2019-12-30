import { CLIEngine } from 'eslint';

export const getEslintOptions = async (fix: boolean): Promise<CLIEngine.Options> => {
  return {
    fix: fix,
    baseConfig: {
      root: true,
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint', 'prettier'],
      rules: {
        'prettier/prettier': 'error',
        '@typescript-eslint/no-unused-vars': 0,
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
      ],
    },
  };
};

export async function getEslintPatterns(): Promise<string[]> {
  return ['./bin/**/*.ts', './lambda/**/*.ts', './lib/**/*.ts'];
}
