import {
	existsSync,
	mkdirSync,
	readFileSync,
	rmSync,
	writeFileSync
} from 'node:fs'
import { join } from 'node:path'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import addScripts from '../../lib/actions/addScripts.js'

const workingDirBase = join(process.cwd(), 'addscripts-test')

const testPaths = {
	script: join(workingDirBase, 'script'),
	'no-script': join(workingDirBase, 'no-script'),
	'no-package': join(workingDirBase, 'no-package')
}

const packageJson = `
  {
    "scripts": {
      "dev": "dev"
    }
  }
  `

const packageJsonNoScript = `
  {
    "name": "testpackage"
  }
  `

describe('add correct scripts to package.json', () => {
	beforeAll(() => {
		if (existsSync(workingDirBase)) rmSync(workingDirBase, { recursive: true })
		mkdirSync(testPaths['script'], { recursive: true })
		mkdirSync(testPaths['no-script'], { recursive: true })
		mkdirSync(testPaths['no-package'], { recursive: true })
		writeFileSync(join(testPaths['script'], 'package.json'), packageJson)
		writeFileSync(
			join(testPaths['no-script'], 'package.json'),
			packageJsonNoScript
		)
	})

	afterAll(() => {
		if (existsSync(workingDirBase)) rmSync(workingDirBase, { recursive: true })
	})

	test('update package.json where a script object exists', () => {
		const result = addScripts(testPaths['script'], 'none')
		expect(result).toBe(true)
		const getPackageJson = JSON.parse(
			readFileSync(join(testPaths['script'], 'package.json'), 'utf8')
		)
		expect(getPackageJson).toHaveProperty('scripts')
		expect(getPackageJson?.scripts).toHaveProperty('deploy', 'cdk deploy --all')
	})

	test('update package.json where no script object exists', () => {
		const result = addScripts(testPaths['no-script'], 'none')
		expect(result).toBe(true)
		const getPackageJson = JSON.parse(
			readFileSync(join(testPaths['no-script'], 'package.json'), 'utf8')
		)
		expect(getPackageJson).toHaveProperty('scripts')
		expect(getPackageJson?.scripts).toHaveProperty('deploy', 'cdk deploy --all')
	})

	test('do nothing if no package.json exists', () => {
		const result = addScripts(testPaths['no-package'], 'none')
		expect(result).toBe(false)
	})

	test('update package.json with test command: vitest', () => {
		const result = addScripts(testPaths['script'], 'vitest')
		expect(result).toBe(true)
		const getPackageJson = JSON.parse(
			readFileSync(join(testPaths['script'], 'package.json'), 'utf8')
		)
		expect(getPackageJson).toHaveProperty('scripts')
		expect(getPackageJson?.scripts).toHaveProperty('test', 'vitest')
	})

	test('update package.json with test command: jest', () => {
		const result = addScripts(testPaths['script'], 'jest')
		expect(result).toBe(true)
		const getPackageJson = JSON.parse(
			readFileSync(join(testPaths['script'], 'package.json'), 'utf8')
		)
		expect(getPackageJson).toHaveProperty('scripts')
		expect(getPackageJson?.scripts).toHaveProperty('test', 'jest')
	})
})
