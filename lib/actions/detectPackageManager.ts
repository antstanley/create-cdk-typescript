import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

function detectEngineByFile(contents: string[], fileNames: string[]): boolean {
  const intersection = fileNames.filter(fileName => contents.includes(fileName))
  return intersection.length > 0
}

function detect(currentPath: string): string {
  let engine: string = 'npm'
  try {
    const dirContents = readdirSync(currentPath, 'utf8')

    const pnpmFiles = ["pnpm-lock.yaml", "pnpm-workspace.yaml", ".pnpmfile.cjs"]
    if (detectEngineByFile(dirContents, pnpmFiles)) engine = 'pnpm'

    // unable to detect pnpm using files, try to detect yarn lockfile
    if (engine === 'npm') {
      if (dirContents.includes('yarn.lock')) engine = 'yarn'
    }

    // unable to detect pnpm or yarn by files, check package.json engines property
    if (engine === 'npm') {
      const packageJsonPath = join(currentPath, 'package.json')
      if (existsSync(packageJsonPath)) {
        const packageJson: { engines?: { [index: string]: string } } = JSON.parse(readFileSync(packageJsonPath, 'utf8'))
        if (typeof packageJson['engines'] !== 'undefined') {
          const { engines } = packageJson
          // check for yarn first, then pnpm second. if yarn and pnpm config both exist then pnpm will overwrite yarn as the engine
          engine = engines['yarn'] ? 'yarn' : engine
          engine = engines['pnpm'] ? 'pnpm' : engine
        }
      }
    }

  } catch (error) {
    console.warn(error)
  }
  return engine
}

function detectPackageManager(currentPath: string, packageManager: PackageOptions = 'auto'): string {
  // default engine is npm, set that upfront. Only try to detect pnpm and yarn.
  let engine: string = 'npm'
  try {

    if (packageManager !== 'auto') {
      if (['npm', 'yarn', 'pnpm'].includes(packageManager)) engine = packageManager
    }
    else {
      engine = detect(currentPath)
    }

  } catch (error) {
    console.warn(error)
  }

  return engine
}

export default detectPackageManager
