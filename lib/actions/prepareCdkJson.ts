import { join } from 'node:path'
import { writeFileSync } from 'node:fs'

function prepareCdkJson(currentPath: string, cdkPath: string): boolean {
  let result = false
  try {
    const cdkJson = `
      {
        "app": "npx ts-node --project ./tsconfig.cdk.json  --prefer-ts-exts ${cdkPath}/index.ts",
        "watch": {
          "include": [
            "**"
          ],
          "exclude": [
            "README.md",
            "cdk*.json",
            "**/*.d.ts",
            "**/*.js",
            "tsconfig.json",
            "package*.json",
            "pnpm*.*"
            "yarn.lock",
            "node_modules",
            "test"
          ]
        }
      }
    `
    writeFileSync(join(currentPath, 'cdk.json'), cdkJson)
    result = true
  } catch (error) {
    console.warn(error)
  }
  return result
}

export default prepareCdkJson
