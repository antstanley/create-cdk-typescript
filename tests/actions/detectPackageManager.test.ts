import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import detectPackageManager from '../../lib/actions/detectPackageManager.js'

const workingDirBase = join(process.cwd(), 'detect-package-manager-test')

const testPaths = {
	'pnpm-file': join(workingDirBase, 'pnpm-file'),
	'yarn-file': join(workingDirBase, 'yarn-file'),
	'pnpm-package': join(workingDirBase, 'pnpm-package'),
	'yarn-package': join(workingDirBase, 'yarn-package')
}

const packageJsonPnpm = `
  {
    "engines": {
      "pnpm": "v0.0.1"
    }
  }
  `

const packageJsonYarn = `
  {
    "engines": {
      "yarn": "v0.0.1"
    }
  }
  `

describe('add correct scripts to package.json', () => {
	beforeAll(() => {
		if (existsSync(workingDirBase)) rmSync(workingDirBase, { recursive: true })
		mkdirSync(testPaths['pnpm-file'], { recursive: true })
		mkdirSync(testPaths['yarn-file'], { recursive: true })
		mkdirSync(testPaths['pnpm-package'], { recursive: true })
		mkdirSync(testPaths['yarn-package'], { recursive: true })
		writeFileSync(
			join(testPaths['pnpm-package'], 'package.json'),
			packageJsonPnpm
		)
		writeFileSync(
			join(testPaths['yarn-package'], 'package.json'),
			packageJsonYarn
		)
	})

	afterAll(() => {
		if (existsSync(workingDirBase)) rmSync(workingDirBase, { recursive: true })
	})

	test('check if "pnpm-lock.yaml" detects as pnpm', () => {
		writeFileSync(join(testPaths['pnpm-file'], 'pnpm-lock.yaml'), 'test')
		const result = detectPackageManager(testPaths['pnpm-file'])
		expect(result).toBe('pnpm')
		rmSync(join(testPaths['pnpm-file'], 'pnpm-lock.yaml'))
	})

	test('check if "pnpm-workspace.yaml" detects as pnpm', () => {
		writeFileSync(join(testPaths['pnpm-file'], 'pnpm-workspace.yaml'), 'test')
		const result = detectPackageManager(testPaths['pnpm-file'])
		expect(result).toBe('pnpm')
		rmSync(join(testPaths['pnpm-file'], 'pnpm-workspace.yaml'))
	})

	test('check if ".pnpmfile.cjs" detects as pnpm', () => {
		writeFileSync(join(testPaths['pnpm-file'], '.pnpmfile.cjs'), 'test')
		const result = detectPackageManager(testPaths['pnpm-file'])
		expect(result).toBe('pnpm')
		rmSync(join(testPaths['pnpm-file'], '.pnpmfile.cjs'))
	})

	test('check if "yarn.lock" detects as yarn', () => {
		writeFileSync(join(testPaths['yarn-file'], 'yarn.lock'), 'test')
		const result = detectPackageManager(testPaths['yarn-file'])
		expect(result).toBe('yarn')
		rmSync(join(testPaths['yarn-file'], 'yarn.lock'))
	})

	test('check if pnpm can be detected from package.json engines property', () => {
		const result = detectPackageManager(testPaths['pnpm-package'])
		expect(result).toBe('pnpm')
	})

	test('check if yarn can be detected from package.json engines property', () => {
		const result = detectPackageManager(testPaths['yarn-package'])
		expect(result).toBe('yarn')
	})

	test('check that it defaults to npm if nothing can be detected', () => {
		const result = detectPackageManager(workingDirBase)
		expect(result).toBe('npm')
	})

	test('check over ride on package manger detection', () => {
		const result = detectPackageManager(workingDirBase, 'yarn')
		expect(result).toBe('yarn')
	})
})
