import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const minimalTsConfig = {
  compilerOptions: {
    incremental: true,
    target: "ES2022",
    module: "NodeNext",
    moduleResolution: "nodenext",
    declaration: true,
    outDir: "./build",
    esModuleInterop: true,
    forceConsistentCasingInFileNames: true,
    strict: true,
    typeRoots: ["./node_modules/@types"],
  },
  exclude: ["node_modules", "cdk.out"],
};

function prepareTsConfig(currentPath: string): boolean {
  let result = false;
  try {
    if (!existsSync(currentPath)) mkdirSync(currentPath, { recursive: true });
    const tsConfigLocation = join(currentPath, "tsconfig.json");

    if (!existsSync(tsConfigLocation)) {
      writeFileSync(tsConfigLocation, JSON.stringify(minimalTsConfig, null, 2));
      result = true;
    } else {
      const existingTsConfigFile = readFileSync(tsConfigLocation, "utf8");
      const existingTsConfig = JSON.parse(existingTsConfigFile);
      const mergedTsConfig = { ...existingTsConfig, ...minimalTsConfig };
      writeFileSync(tsConfigLocation, JSON.stringify(mergedTsConfig, null, 2));
      result = true;
    }
  } catch (error) {
    console.warn(error);
  }
  return result;
}

export default prepareTsConfig;
