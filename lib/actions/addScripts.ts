import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import stripJsonComments from 'strip-json-comments'

type PackageScripts = {
	[index: string]: string
}

type PackageJson = {
	name: string
	version: string
	type: 'module' | 'commonjs'
	main: string
	scripts?: { [index: string]: string }
}

function addScripts(currentPath: string, config: Config): boolean {
	// default engine is npm, set that upfront. Only try to detect pnpm and yarn.
	let result = false
	try {
		const newScripts: PackageScripts = {
			deploy: 'cdk deploy --all'
		}

		if (['none', 'jest', 'vitest'].includes(config.test)) {
			if (config.test !== 'none') {
				newScripts['test'] = config.test
			}
		}

		if (config.biome) {
			newScripts['format'] =
				'npx @biomejs/biome format --write . && npx @biomejs/biome check --write .'
		}

		if (config.oxlint) {
			newScripts['lint'] = 'npx oxlint'
		}

		const packageJsonPath = join(currentPath, 'package.json')

		let packageJson: PackageJson | undefined

		if (!existsSync(packageJsonPath)) {
			if (typeof config?.name === 'string') {
				console.log('Unable to find package.json, creating')
				packageJson = {
					name: config.name,
					version: '0.0.1',
					type: 'module',
					main: 'index.js'
				}
			}
		} else {
			const packageJsonFile = readFileSync(packageJsonPath, 'utf8')
			packageJson = JSON.parse(stripJsonComments(packageJsonFile))
		}

		if (
			typeof packageJson === 'object' &&
			typeof packageJson?.name === 'string'
		) {
			if (typeof packageJson?.scripts === 'object') {
				packageJson.scripts = Object.assign(packageJson.scripts, newScripts)
			} else {
				packageJson.scripts = newScripts
			}
			writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
			result = true
		} else {
			result = false
			console.warn(
				'Unable to find package.json file to add scripts to',
				currentPath
			)
		}
	} catch (error) {
		console.warn(error)
	}

	return result
}

export default addScripts
