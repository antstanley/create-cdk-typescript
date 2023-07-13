import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

type PackageScripts = {
  [index: string]: string
}

function addScripts(currentPath: string, testFramework: string): boolean {
  // default engine is npm, set that upfront. Only try to detect pnpm and yarn.
  let result = false
  try {
    const newScripts: PackageScripts = {
      'deploy': 'cdk deploy --all'
    }

    if (testFramework !== 'none') {
      newScripts['test'] = testFramework
    }

    const packageJsonPath = join(currentPath, 'package.json')
    if (existsSync(packageJsonPath)) {
      const packageJson: { scripts?: { [index: string]: string } } = JSON.parse(readFileSync(packageJsonPath, 'utf8'))

      if (typeof packageJson.scripts === 'object') {
        packageJson.scripts = Object.assign(packageJson.scripts, newScripts)
      } else {
        packageJson.scripts = newScripts
      }
      writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
      result = true
    } else {
      result = false
      console.warn('Unable to find package.json file to add scripts to', currentPath)
    }
  } catch (error) {
    console.warn(error)
  }

  return result
}

export default addScripts
