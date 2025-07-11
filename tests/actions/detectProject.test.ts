import { describe, test, beforeAll, afterAll, expect } from 'vitest'
import {
	mkdirSync,
	rmSync,
	existsSync,
	writeFileSync,
	readFileSync
} from 'node:fs'
import { join } from 'node:path'
import detectProject from '../../lib/actions/detectProject.js'

const workingDirBase = join(process.cwd(), 'detect-project-test')

const testPaths = {
	existing: join(workingDirBase, 'existing'),
	clean: join(workingDirBase, 'clean')
}

describe('detect existing project vs clean project', () => {
	beforeAll(() => {
		if (existsSync(workingDirBase)) rmSync(workingDirBase, { recursive: true })
		mkdirSync(testPaths['existing'], { recursive: true })
		mkdirSync(testPaths['clean'], { recursive: true })
		writeFileSync(
			join(testPaths['existing'], 'test.txt'),
			'this is a test file to see if if clean'
		)
	})

	afterAll(() => {
		if (existsSync(workingDirBase)) rmSync(workingDirBase, { recursive: true })
	})

	test('check if existing project detected', () => {
		const result = detectProject(testPaths['existing'])
		expect(result).toBe(true)
	})

	test('check if clean project detected', () => {
		const result = detectProject(testPaths['clean'])
		expect(result).toBe(false)
	})
})
