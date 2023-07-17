import { readdirSync } from 'node:fs'


function detectProject(currentPath: string): boolean {
  let result = false
  try {
    const dirContents = readdirSync(currentPath, 'utf8')
    if (dirContents.length > 0) {
      console.log("Directory is not empty. Adding CDK config to existing project")
      result = true
    } else {
      console.log("Clean directory detected. Bootstrapping CDK project from scratch")
      result = false
    }

  } catch (error) {
    console.warn(error)
  }

  return result
}

export default detectProject
