import { existsSync, mkdirSync, readFileSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import yaml from 'yaml'
import prepareLefthookConfig from '../../lib/actions/prepareLefthookYaml.js'

const workingDirBase = join(process.cwd(), 'prepare-cdktsconfig')

describe('add lefthook.yaml file in root folder', () => {
	beforeAll(() => {
		if (existsSync(workingDirBase)) rmSync(workingDirBase, { recursive: true })
		mkdirSync(workingDirBase, { recursive: true })
	})

	afterAll(() => {
		if (existsSync(workingDirBase)) rmSync(workingDirBase, { recursive: true })
	})

	test('create lefthook.yaml in correct location with correct config', () => {
		const result = prepareLefthookConfig(workingDirBase)
		expect(result).toBe(true)
		const getLefthookYaml = yaml.parse(
			readFileSync(join(workingDirBase, 'lefthook.yml'), 'utf8')
		)
		expect(getLefthookYaml).toHaveProperty('pre-commit')
		expect(getLefthookYaml?.['pre-commit']).toHaveProperty('commands')
		expect(getLefthookYaml?.['pre-commit']?.commands).toHaveProperty('lint')
		expect(getLefthookYaml?.['pre-commit']?.commands).toHaveProperty('format')
	})
})
