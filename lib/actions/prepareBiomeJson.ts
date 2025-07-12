import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const minimalBiomeConfig = {
  formatter: {
    enabled: true,
    formatWithErrors: false,
    indentStyle: "tab",
    indentWidth: 2,
    lineWidth: 80,
    lineEnding: "lf",
  },
  javascript: {
    formatter: {
      indentStyle: "tab",
      indentWidth: 2,
      lineWidth: 80,
      quoteStyle: "single",
      quoteProperties: "asNeeded",
      semicolons: "asNeeded",
      trailingCommas: "none",
    },
  },
  json: {
    formatter: {
      enabled: true,
      trailingCommas: "none",
      indentStyle: "tab",
      indentWidth: 2,
      lineWidth: 80,
    },
  },
  linter: {
    enabled: false,
  },
  assist: {
    actions: {
      source: { organizeImports: "on" },
    },
  },
};

function prepareBiomeConfig(currentPath: string): boolean {
  let result = false;
  try {
    if (!existsSync(currentPath)) mkdirSync(currentPath, { recursive: true });
    const biomeConfigLocation = join(currentPath, "biome.json");

    if (!existsSync(biomeConfigLocation)) {
      writeFileSync(
        biomeConfigLocation,
        JSON.stringify(minimalBiomeConfig, null, 2),
      );
      result = true;
    } else {
      const existingBiomeConfigFile = readFileSync(biomeConfigLocation, "utf8");
      const existingBiomeConfig = JSON.parse(existingBiomeConfigFile);
      const mergedBiomeConfig = {
        ...existingBiomeConfig,
        ...minimalBiomeConfig,
      };
      writeFileSync(
        biomeConfigLocation,
        JSON.stringify(mergedBiomeConfig, null, 2),
      );
      result = true;
    }
  } catch (error) {
    console.warn(error);
  }
  return result;
}

export default prepareBiomeConfig;
