import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import fetchConfig from "../lib/fetchConfig.js";

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

const workingDirBase = join(process.cwd(), "fetch-config-test");

const testPaths = {
  config: join(workingDirBase, "config"),
};

describe("fetch config to be used", () => {
  beforeAll(() => {
    if (existsSync(workingDirBase)) rmSync(workingDirBase, { recursive: true });
    mkdirSync(testPaths["config"], { recursive: true });
    writeFileSync(
      join(testPaths["config"], "config.json"),
      JSON.stringify(defaultConfig),
      "utf8",
    );
  });

  afterAll(() => {
    if (existsSync(workingDirBase)) rmSync(workingDirBase, { recursive: true });
  });

  test("when correct path is specified", () => {
    const configPath = join(testPaths["config"], "config.json");
    const result = fetchConfig(configPath);
    expect(result).toStrictEqual(defaultConfig);
  });

  test.fails("throws error when incorrect path is specified", () => {
    const configPath = join(workingDirBase, "config.json");
    fetchConfig(configPath);
  });
});
