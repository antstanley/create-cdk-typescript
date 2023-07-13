import { describe, test, beforeAll, afterAll, expect } from 'vitest'
import prepareInstall from '../../lib/actions/prepareInstall.js'


describe('generate correct package installation script', () => {

  test('yarn add vitest', () => {
    const result = prepareInstall('yarn', 'vitest')
    expect(result).toBe('yarn add -D aws-cdk@latest aws-cdk-lib@latest vitest@latest')
  })

  test('yarn add jest', () => {
    const result = prepareInstall('yarn', 'jest')
    expect(result).toBe('yarn add -D aws-cdk@latest aws-cdk-lib@latest jest@latest')
  })

  test('yarn add none', () => {
    const result = prepareInstall('yarn', 'none')
    expect(result).toBe('yarn add -D aws-cdk@latest aws-cdk-lib@latest')
  })

  test('pnpm install vitest', () => {
    const result = prepareInstall('pnpm', 'vitest')
    expect(result).toBe('pnpm add -D aws-cdk@latest aws-cdk-lib@latest vitest@latest')
  })

  test('pnpm install jest', () => {
    const result = prepareInstall('pnpm', 'jest')
    expect(result).toBe('pnpm add -D aws-cdk@latest aws-cdk-lib@latest jest@latest')
  })

  test('pnpm install none', () => {
    const result = prepareInstall('pnpm', 'none')
    expect(result).toBe('pnpm add -D aws-cdk@latest aws-cdk-lib@latest')
  })

  test('npm install vitest', () => {
    const result = prepareInstall('npm', 'vitest')
    expect(result).toBe('npm install -D aws-cdk@latest aws-cdk-lib@latest vitest@latest')
  })

  test('npm install jest', () => {
    const result = prepareInstall('npm', 'jest')
    expect(result).toBe('npm install -D aws-cdk@latest aws-cdk-lib@latest jest@latest')
  })

  test('npm install none', () => {
    const result = prepareInstall('npm', 'none')
    expect(result).toBe('npm install -D aws-cdk@latest aws-cdk-lib@latest')
  })

})
