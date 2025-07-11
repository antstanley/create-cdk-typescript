import { existsSync, mkdirSync, readFileSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import prepareTsConfig from '../../lib/actions/prepareTsConfig.js'

const workingDirBase = join(process.cwd(), 'prepare-cdktsconfig')

const cdkPath = './cdk'

describe('add cdk specific tsconfig file in cdk folder', () => {
	beforeAll(() => {
		if (existsSync(workingDirBase)) rmSync(workingDirBase, { recursive: true })
		mkdirSync(workingDirBase, { recursive: true })
	})

	afterAll(() => {
		if (existsSync(workingDirBase)) rmSync(workingDirBase, { recursive: true })
	})

	test('create tsconfig.json in correct location with correct config', () => {
		const result = prepareTsConfig(workingDirBase, cdkPath)
		expect(result).toBe(true)
		const getTsConfigJson = JSON.parse(
			readFileSync(join(workingDirBase, cdkPath, 'tsconfig.json'), 'utf8')
		)
		expect(getTsConfigJson).toHaveProperty('compilerOptions')
		expect(getTsConfigJson?.compilerOptions).toHaveProperty('module')
		expect(getTsConfigJson?.compilerOptions?.module).toBe('commonjs')
	})
})
