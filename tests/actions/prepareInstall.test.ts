import { describe, test, beforeAll, afterAll, expect } from 'vitest'
import prepareInstall from '../../lib/actions/prepareInstall.js'


describe('generate correct package installation script', () => {

  test('yarn add vitest', () => {
    const result = prepareInstall('yarn', 'vitest')
    expect(result.command).toBe('yarn')
    expect(result.args).toStrictEqual(['add', '-D', 'aws-cdk@latest', 'aws-cdk-lib@latest', 'typescript@latest', 'ts-node@latest', 'vitest@latest'])
  })

  test('yarn add jest', () => {
    const result = prepareInstall('yarn', 'jest')
    expect(result.command).toBe('yarn')
    expect(result.args).toStrictEqual(['add', '-D', 'aws-cdk@latest', 'aws-cdk-lib@latest', 'typescript@latest', 'ts-node@latest', 'jest@latest', 'ts-jest@latest'])
  })

  test('yarn add none', () => {
    const result = prepareInstall('yarn', 'none')
    expect(result.command).toBe('yarn')
    expect(result.args).toStrictEqual(['add', '-D', 'aws-cdk@latest', 'aws-cdk-lib@latest', 'typescript@latest', 'ts-node@latest'])
  })

  test('pnpm install vitest', () => {
    const result = prepareInstall('pnpm', 'vitest')
    expect(result.command).toBe('pnpm')
    expect(result.args).toStrictEqual(['add', '-D', 'aws-cdk@latest', 'aws-cdk-lib@latest', 'typescript@latest', 'ts-node@latest', 'vitest@latest'])
  })

  test('pnpm install jest', () => {
    const result = prepareInstall('pnpm', 'jest')
    expect(result.command).toBe('pnpm')
    expect(result.args).toStrictEqual(['add', '-D', 'aws-cdk@latest', 'aws-cdk-lib@latest', 'typescript@latest', 'ts-node@latest', 'jest@latest', 'ts-jest@latest'])
  })

  test('pnpm install none', () => {
    const result = prepareInstall('pnpm', 'none')
    expect(result.command).toBe('pnpm')
    expect(result.args).toStrictEqual(['add', '-D', 'aws-cdk@latest', 'aws-cdk-lib@latest', 'typescript@latest', 'ts-node@latest'])
  })

  test('npm install vitest', () => {
    const result = prepareInstall('npm', 'vitest')
    expect(result.command).toBe('npm')
    expect(result.args).toStrictEqual(['install', '-D', 'aws-cdk@latest', 'aws-cdk-lib@latest', 'typescript@latest', 'ts-node@latest', 'vitest@latest'])
  })

  test('npm install jest', () => {
    const result = prepareInstall('npm', 'jest')
    expect(result.command).toBe('npm')
    expect(result.args).toStrictEqual(['install', '-D', 'aws-cdk@latest', 'aws-cdk-lib@latest', 'typescript@latest', 'ts-node@latest', 'jest@latest', 'ts-jest@latest'])
  })

  test('npm install none', () => {
    const result = prepareInstall('npm', 'none')
    expect(result.command).toBe('npm')
    expect(result.args).toStrictEqual(['install', '-D', 'aws-cdk@latest', 'aws-cdk-lib@latest', 'typescript@latest', 'ts-node@latest'])
  })

})
