import { join } from 'node:path'
import { writeFileSync } from 'node:fs'

const cdkJest = `
module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/test'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  }
};
`

function prepareJest(currentPath: string, testFramework?: string): boolean {
  let result = false
  try {
    if (testFramework) {
      if (testFramework === 'jest') {
        writeFileSync(join(currentPath, 'jest.config.js'), cdkJest)
        result = true
      }
    }
  } catch (error) {
    console.warn(error)
  }
  return result
}

export default prepareJest
