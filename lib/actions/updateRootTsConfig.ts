import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

function updateRootTsConfig(currentPath: string, cdkPath: string): boolean {
  // default engine is npm, set that upfront. Only try to detect pnpm and yarn.
  let result = false
  try {

    const excludeGlob = join(cdkPath, '**/*')

    const tsConfigJsonPath = join(currentPath, 'tsconfig.json')
    if (existsSync(tsConfigJsonPath)) {
      const tsConfig: { exclude?: string[] } = JSON.parse(readFileSync(tsConfigJsonPath, 'utf8'))

      if (typeof tsConfig.exclude === 'object') {
        tsConfig.exclude.push(excludeGlob)
      } else {
        tsConfig.exclude = [excludeGlob]
      }
      writeFileSync(tsConfigJsonPath, JSON.stringify(tsConfig, null, 2))
      result = true
    } else {
      result = false
      console.warn('Unable to find root tsconfig.json file to add exclude script to', currentPath)
    }
  } catch (error) {
    console.warn(error)
  }

  return result
}

export default updateRootTsConfig
