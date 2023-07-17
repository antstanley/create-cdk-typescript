import { describe, test, beforeAll, afterAll, expect } from 'vitest'
import { mkdirSync, rmSync, existsSync, writeFileSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import prepareJest from '../../lib/actions/prepareJest.js'

const workingDirBase = join(process.cwd(), 'prepare-jest')

const expectedString = `
module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/test'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  }
};
`

describe('add jest config file in root with correct config', () => {

  beforeAll(() => {
    if (existsSync(workingDirBase)) rmSync(workingDirBase, { recursive: true })
    mkdirSync(workingDirBase, { recursive: true })
  })

  afterAll(() => {
    if (existsSync(workingDirBase)) rmSync(workingDirBase, { recursive: true })
  })

  test('create jest.config.js in correct location', () => {
    const result = prepareJest(workingDirBase)
    expect(result).toBe(true)
    const getJest = readFileSync(join(workingDirBase, 'jest.config.js'), 'utf8')
    expect(getJest).toBe(expectedString)
  })

})
