import pkg from "../package.json";

export function getVersion(): string {
  return pkg.version;
}

export function createRecommendedVersion(semver: string): string {
  const [major, minor] = semver.split(".");
  return [major, minor].join(".");
}

export function getRecommendedVersion(): string {
  return createRecommendedVersion(getVersion());
}
