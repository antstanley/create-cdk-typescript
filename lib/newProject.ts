import type { Config } from './types.js'
import { writeFileSync } from 'node:fs'

function newProject(config: Config): boolean {
  let result = false
  try {
    const packageJson = {
      name: config?.name,
    }

    writeFileSync(config.root, JSON.stringify(packageJson, null, 2))
  } catch (error) {}
  return result
}

export default newProject
