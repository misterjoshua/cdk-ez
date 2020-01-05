import { mapInputPathToDist } from "./rollup";

it("creates a dist path from an index path", () => {
  expect(mapInputPathToDist("./lambda/hello.ts")).toBe("lambda/hello/index.js");
  expect(mapInputPathToDist("./lambda/hello/inner.ts")).toBe(
    "lambda/hello/inner/index.js"
  );
});
