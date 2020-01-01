import { createRecommendedVersion } from "./getVersion";

it("creates compatible version numbers for semantic versioning", () => {
  expect(createRecommendedVersion("0.1.5")).toBe("0.1");
  expect(createRecommendedVersion("0.1.99")).toBe("0.1");
  expect(createRecommendedVersion("0.2.0")).toBe("0.2");
  expect(createRecommendedVersion("1.0.0")).toBe("1.0");
  expect(createRecommendedVersion("1.0.1")).toBe("1.0");
  expect(createRecommendedVersion("1.1")).toBe("1.1");
  expect(createRecommendedVersion("2.0")).toBe("2.0");
});
