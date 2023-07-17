import { describe, test, beforeAll, afterAll, expect } from 'vitest'
import { join } from 'node:path'
import { existsSync, mkdirSync, rmSync } from 'node:fs'
import buildConfig from '../lib/buildConfig.js'

const defaultConfig: Config = {
  root: process.cwd(),
  dir: './cdk',
  test: 'none',
  packageManager: 'auto',
  override: false
}

const workingDirBase = join(process.cwd(), 'build-config-test')

const testPaths = {
  'root': join(workingDirBase, 'root')
}


describe('generate config to be used', () => {

  beforeAll(() => {
    if (existsSync(workingDirBase)) rmSync(workingDirBase, { recursive: true })
    mkdirSync(testPaths['root'], { recursive: true })
  })

  afterAll(() => {
    if (existsSync(workingDirBase)) rmSync(workingDirBase, { recursive: true })
  })

  test('when option is "yes"', () => {
    const args = { yes: true }
    const result = buildConfig(args)
    expect(result).toStrictEqual(defaultConfig)
  })

  test('when option "root" = "./root"', () => {
    const args = { root: './root' }
    const expectedConfig = {
      ...JSON.parse(JSON.stringify(defaultConfig)), ...{ root: join(process.cwd(), './root') }
    }

    const result = buildConfig(args)
    expect(result).toStrictEqual(expectedConfig)
  })

  test('when option "root" = "{cwd}/root"', () => {
    const args = { root: join(process.cwd(), './root') }
    const expectedConfig = {
      ...JSON.parse(JSON.stringify(defaultConfig)), ...{ root: join(process.cwd(), './root') }
    }

    const result = buildConfig(args)
    expect(result).toStrictEqual(expectedConfig)
  })

  test('when option "dir" = "./cdk-test"', () => {
    const args = { dir: './cdk-test' }
    const expectedConfig = {
      ...JSON.parse(JSON.stringify(defaultConfig)), ...{ dir: './cdk-test' }
    }

    const result = buildConfig(args)
    expect(result).toStrictEqual(expectedConfig)
  })

  test('when option "test" is not specified', () => {
    const args = {}
    const expectedConfig = {
      ...JSON.parse(JSON.stringify(defaultConfig)), ...{ test: 'none' }
    }

    const result = buildConfig(args)
    expect(result).toStrictEqual(expectedConfig)
  })

  test('when option "test" = "none"', () => {
    const args = { test: 'none' }
    const expectedConfig = {
      ...JSON.parse(JSON.stringify(defaultConfig)), ...{ test: 'none' }
    }

    const result = buildConfig(args)
    expect(result).toStrictEqual(expectedConfig)
  })

  test('when option "test" = "jest"', () => {
    const args = { test: 'jest' }
    const expectedConfig = {
      ...JSON.parse(JSON.stringify(defaultConfig)), ...{ test: 'jest' }
    }

    const result = buildConfig(args)
    expect(result).toStrictEqual(expectedConfig)
  })

  test('when option "test" = "vitest"', () => {
    const args = { test: 'vitest' }
    const expectedConfig = {
      ...JSON.parse(JSON.stringify(defaultConfig)), ...{ test: 'vitest' }
    }

    const result = buildConfig(args)
    expect(result).toStrictEqual(expectedConfig)
  })

  test('when option "packageManager" is not specified', () => {
    const args = {}
    const expectedConfig = {
      ...JSON.parse(JSON.stringify(defaultConfig)), ...{ packageManager: 'auto' }
    }

    const result = buildConfig(args)
    expect(result).toStrictEqual(expectedConfig)
  })

  test('when option "packageManager" = "auto"', () => {
    const args = { packageManager: 'auto' }
    const expectedConfig = {
      ...JSON.parse(JSON.stringify(defaultConfig)), ...{ packageManager: 'auto' }
    }

    const result = buildConfig(args)
    expect(result).toStrictEqual(expectedConfig)
  })

  test('when option "packageManager" = "npm"', () => {
    const args = { "package-manager": 'npm' }
    const expectedConfig = {
      ...JSON.parse(JSON.stringify(defaultConfig)), ...{ packageManager: 'npm' }
    }

    const result = buildConfig(args)
    expect(result).toStrictEqual(expectedConfig)
  })

  test('when option "package-manager" = "yarn"', () => {
    const args = { 'package-manager': 'yarn' }
    const expectedConfig = {
      ...JSON.parse(JSON.stringify(defaultConfig)), ...{ packageManager: 'yarn' }
    }

    const result = buildConfig(args)
    expect(result).toStrictEqual(expectedConfig)
  })

  test('when option "package-manager" = "pnpm"', () => {
    const args = { 'package-manager': 'pnpm' }
    const expectedConfig = {
      ...JSON.parse(JSON.stringify(defaultConfig)), ...{ packageManager: 'pnpm' }
    }

    const result = buildConfig(args)
    expect(result).toStrictEqual(expectedConfig)
  })

})
