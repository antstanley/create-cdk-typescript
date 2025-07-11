import { describe, expect, test } from "vitest";
import prepareInstall from "../../lib/actions/prepareInstall.js";

describe("generate correct package installation script", () => {
  test("yarn add vitest", () => {
    const result = prepareInstall("yarn", {
      test: "vitest",
      oxlint: false,
      biome: false,
      lefthook: false,
    });
    expect(result.command).toBe("yarn");
    expect(result.args).toStrictEqual([
      "add",
      "-D",
      "aws-cdk@latest",
      "aws-cdk-lib@latest",
      "constructs@latest",
      "typescript@latest",
      "tsx@latest",
      "vitest@latest",
    ]);
  });

  test("yarn add jest", () => {
    const result = prepareInstall("yarn", {
      test: "jest",
      oxlint: false,
      biome: false,
      lefthook: false,
    });
    expect(result.command).toBe("yarn");
    expect(result.args).toStrictEqual([
      "add",
      "-D",
      "aws-cdk@latest",
      "aws-cdk-lib@latest",
      "constructs@latest",
      "typescript@latest",
      "tsx@latest",
      "jest@latest",
      "ts-jest@latest",
    ]);
  });

  test("yarn add none", () => {
    const result = prepareInstall("yarn", {
      test: "none",
      oxlint: false,
      biome: false,
      lefthook: false,
    });
    expect(result.command).toBe("yarn");
    expect(result.args).toStrictEqual([
      "add",
      "-D",
      "aws-cdk@latest",
      "aws-cdk-lib@latest",
      "constructs@latest",
      "typescript@latest",
      "tsx@latest",
    ]);
  });

  test("pnpm install vitest", () => {
    const result = prepareInstall("pnpm", {
      test: "vitest",
      oxlint: false,
      biome: false,
      lefthook: false,
    });
    expect(result.command).toBe("pnpm");
    expect(result.args).toStrictEqual([
      "add",
      "-D",
      "aws-cdk@latest",
      "aws-cdk-lib@latest",
      "constructs@latest",
      "typescript@latest",
      "tsx@latest",
      "vitest@latest",
    ]);
  });

  test("pnpm install jest", () => {
    const result = prepareInstall("pnpm", {
      test: "jest",
      oxlint: false,
      biome: false,
      lefthook: false,
    });
    expect(result.command).toBe("pnpm");
    expect(result.args).toStrictEqual([
      "add",
      "-D",
      "aws-cdk@latest",
      "aws-cdk-lib@latest",
      "constructs@latest",
      "typescript@latest",
      "tsx@latest",
      "jest@latest",
      "ts-jest@latest",
    ]);
  });

  test("pnpm install none", () => {
    const result = prepareInstall("pnpm", {
      test: "none",
      oxlint: false,
      biome: false,
      lefthook: false,
    });
    expect(result.command).toBe("pnpm");
    expect(result.args).toStrictEqual([
      "add",
      "-D",
      "aws-cdk@latest",
      "aws-cdk-lib@latest",
      "constructs@latest",
      "typescript@latest",
      "tsx@latest",
    ]);
  });

  test("npm install vitest", () => {
    const result = prepareInstall("npm", {
      test: "vitest",
      oxlint: false,
      biome: false,
      lefthook: false,
    });
    expect(result.command).toBe("npm");
    expect(result.args).toStrictEqual([
      "install",
      "-D",
      "aws-cdk@latest",
      "aws-cdk-lib@latest",
      "constructs@latest",
      "typescript@latest",
      "tsx@latest",
      "vitest@latest",
    ]);
  });

  test("npm install jest", () => {
    const result = prepareInstall("npm", {
      test: "jest",
      oxlint: false,
      biome: false,
      lefthook: false,
    });
    expect(result.command).toBe("npm");
    expect(result.args).toStrictEqual([
      "install",
      "-D",
      "aws-cdk@latest",
      "aws-cdk-lib@latest",
      "constructs@latest",
      "typescript@latest",
      "tsx@latest",
      "jest@latest",
      "ts-jest@latest",
    ]);
  });

  test("npm install none", () => {
    const result = prepareInstall("npm", {
      test: "none",
      oxlint: false,
      biome: false,
      lefthook: false,
    });
    expect(result.command).toBe("npm");
    expect(result.args).toStrictEqual([
      "install",
      "-D",
      "aws-cdk@latest",
      "aws-cdk-lib@latest",
      "constructs@latest",
      "typescript@latest",
      "tsx@latest",
    ]);
  });

  test("pnpm add @biomejs/biome lefthook oxlint", () => {
    const result = prepareInstall("pnpm", {
      test: "none",
      oxlint: true,
      biome: true,
      lefthook: true,
    });
    expect(result.command).toBe("pnpm");
    expect(result.args).toStrictEqual([
      "add",
      "-D",
      "aws-cdk@latest",
      "aws-cdk-lib@latest",
      "constructs@latest",
      "typescript@latest",
      "tsx@latest",
      "oxlint@latest",
      "lefthook@latest",
      "@biomejs/biome@latest",
    ]);
  });

  test("yarn add @biomejs/biome lefthook oxlint", () => {
    const result = prepareInstall("yarn", {
      test: "none",
      oxlint: true,
      biome: true,
      lefthook: true,
    });
    expect(result.command).toBe("yarn");
    expect(result.args).toStrictEqual([
      "add",
      "-D",
      "aws-cdk@latest",
      "aws-cdk-lib@latest",
      "constructs@latest",
      "typescript@latest",
      "tsx@latest",
      "oxlint@latest",
      "lefthook@latest",
      "@biomejs/biome@latest",
    ]);
  });

  test("npm install @biomejs/biome lefthook oxlint", () => {
    const result = prepareInstall("npm", {
      test: "none",
      oxlint: true,
      biome: true,
      lefthook: true,
    });
    expect(result.command).toBe("npm");
    expect(result.args).toStrictEqual([
      "install",
      "-D",
      "aws-cdk@latest",
      "aws-cdk-lib@latest",
      "constructs@latest",
      "typescript@latest",
      "tsx@latest",
      "oxlint@latest",
      "lefthook@latest",
      "@biomejs/biome@latest",
    ]);
  });
});
