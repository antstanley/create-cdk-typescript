import { existsSync, mkdirSync, readFileSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import prepareBiomeConfig from '../../lib/actions/prepareBiomeJson.js'

const workingDirBase = join(process.cwd(), 'prepare-cdktsconfig')

describe('add biome.json file in root folder', () => {
	beforeAll(() => {
		if (existsSync(workingDirBase)) rmSync(workingDirBase, { recursive: true })
		mkdirSync(workingDirBase, { recursive: true })
	})

	afterAll(() => {
		if (existsSync(workingDirBase)) rmSync(workingDirBase, { recursive: true })
	})

	test('create biome.json in correct location with correct config', () => {
		const result = prepareBiomeConfig(workingDirBase)
		expect(result).toBe(true)
		const getBiomeJson = JSON.parse(
			readFileSync(join(workingDirBase, 'biome.json'), 'utf8')
		)
		expect(getBiomeJson).toHaveProperty('javascript')
		expect(getBiomeJson?.javascript).toHaveProperty('formatter')
		expect(getBiomeJson?.javascript?.formatter).toHaveProperty('indentStyle')
		expect(getBiomeJson?.javascript?.formatter?.indentStyle).toBe('tab')
	})
})
