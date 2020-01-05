import { applyLocalConfig } from "../applyLocalConfig";

export async function getJestConfig(): Promise<jest.InitialOptions> {
  return await applyLocalConfig("jest", {
    roots: ["<rootDir>/lib", "<rootDir>/bin", "<rootDir>/test"],
    testMatch: [
      "**/__tests__/**/*.+(ts|tsx|js)",
      "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    transform: {
      "^.+\\.(ts|tsx)$": "ts-jest"
    }
  });
}
