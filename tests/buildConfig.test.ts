import { existsSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { Arguments } from "yargs-parser";
import buildConfig from "../lib/buildConfig.js";

const defaultConfig: Config = {
  name: process.cwd().replace(/\/$/, "").split("/").pop(),
  root: process.cwd(),
  dir: "./cdk",
  test: "none",
  packageManager: "auto",
  override: false,
  oxlint: true,
  lefthook: true,
  biome: true,
};

const workingDirBase = join(process.cwd(), "build-config-test");

const testPaths = {
  root: join(workingDirBase, "root"),
};

describe("generate config to be used", () => {
  beforeAll(() => {
    if (existsSync(workingDirBase)) rmSync(workingDirBase, { recursive: true });
    mkdirSync(testPaths["root"], { recursive: true });
  });

  afterAll(() => {
    if (existsSync(workingDirBase)) rmSync(workingDirBase, { recursive: true });
  });

  test('when option is "yes"', () => {
    const args: Arguments = { yes: true, _: [""] };
    const result = buildConfig(args);
    expect(result).toStrictEqual(defaultConfig);
  });

  test('when option "root" = "./root"', () => {
    const args: Arguments = { root: "./root", _: [""] };
    const expectedConfig = {
      ...JSON.parse(JSON.stringify(defaultConfig)),
      ...{ root: join(process.cwd(), "./root") },
    };

    const result = buildConfig(args);
    expect(result).toStrictEqual(expectedConfig);
  });

  test('when option "root" = "{cwd}/root"', () => {
    const args: Arguments = { root: join(process.cwd(), "./root"), _: [""] };
    const expectedConfig = {
      ...JSON.parse(JSON.stringify(defaultConfig)),
      ...{ root: join(process.cwd(), "./root") },
    };

    const result = buildConfig(args);
    expect(result).toStrictEqual(expectedConfig);
  });

  test('when option "dir" = "./cdk-test"', () => {
    const args: Arguments = { dir: "./cdk-test", _: [""] };
    const expectedConfig = {
      ...JSON.parse(JSON.stringify(defaultConfig)),
      ...{ dir: "./cdk-test" },
    };

    const result = buildConfig(args);
    expect(result).toStrictEqual(expectedConfig);
  });

  test('when option "test" is not specified', () => {
    const args: Arguments = { _: [""] };
    const expectedConfig = {
      ...JSON.parse(JSON.stringify(defaultConfig)),
      ...{ test: "none" },
    };

    const result = buildConfig(args);
    expect(result).toStrictEqual(expectedConfig);
  });

  test('when option "test" = "none"', () => {
    const args: Arguments = { test: "none", _: [""] };
    const expectedConfig = {
      ...JSON.parse(JSON.stringify(defaultConfig)),
      ...{ test: "none" },
    };

    const result = buildConfig(args);
    expect(result).toStrictEqual(expectedConfig);
  });

  test('when option "test" = "jest"', () => {
    const args: Arguments = { test: "jest", _: [""] };
    const expectedConfig = {
      ...JSON.parse(JSON.stringify(defaultConfig)),
      ...{ test: "jest" },
    };

    const result = buildConfig(args);
    expect(result).toStrictEqual(expectedConfig);
  });

  test('when option "test" = "vitest"', () => {
    const args: Arguments = { test: "vitest", _: [""] };
    const expectedConfig = {
      ...JSON.parse(JSON.stringify(defaultConfig)),
      ...{ test: "vitest" },
    };

    const result = buildConfig(args);
    expect(result).toStrictEqual(expectedConfig);
  });

  test('when option "packageManager" is not specified', () => {
    const args: Arguments = { _: [""] };
    const expectedConfig = {
      ...JSON.parse(JSON.stringify(defaultConfig)),
      ...{ packageManager: "auto" },
    };

    const result = buildConfig(args);
    expect(result).toStrictEqual(expectedConfig);
  });

  test('when option "packageManager" = "auto"', () => {
    const args: Arguments = { packageManager: "auto", _: [""] };
    const expectedConfig = {
      ...JSON.parse(JSON.stringify(defaultConfig)),
      ...{ packageManager: "auto" },
    };

    const result = buildConfig(args);
    expect(result).toStrictEqual(expectedConfig);
  });

  test('when option "packageManager" = "npm"', () => {
    const args: Arguments = { packageManager: "npm", _: [""] };
    const expectedConfig = {
      ...JSON.parse(JSON.stringify(defaultConfig)),
      ...{ packageManager: "npm" },
    };

    const result = buildConfig(args);
    expect(result).toStrictEqual(expectedConfig);
  });

  test('when option "package-manager" = "yarn"', () => {
    const args: Arguments = { packageManager: "yarn", _: [""] };
    const expectedConfig = {
      ...JSON.parse(JSON.stringify(defaultConfig)),
      ...{ packageManager: "yarn" },
    };

    const result = buildConfig(args);
    expect(result).toStrictEqual(expectedConfig);
  });

  test('when option "package-manager" = "pnpm"', () => {
    const args: Arguments = { packageManager: "pnpm", _: [""] };
    const expectedConfig = {
      ...JSON.parse(JSON.stringify(defaultConfig)),
      ...{ packageManager: "pnpm" },
    };

    const result = buildConfig(args);
    expect(result).toStrictEqual(expectedConfig);
  });

  test('when option "name" = "test-project"', () => {
    const args: Arguments = { name: "test-project", _: [""] };
    const expectedConfig = {
      ...JSON.parse(JSON.stringify(defaultConfig)),
      ...{ name: "test-project" },
    };

    const result = buildConfig(args);
    expect(result).toStrictEqual(expectedConfig);
  });
});
