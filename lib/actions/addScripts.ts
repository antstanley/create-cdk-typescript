import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import stripJsonComments from 'strip-json-comments'

type PackageScripts = {
	[index: string]: string
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
		if (existsSync(packageJsonPath)) {
			const packageJsonFile = readFileSync(packageJsonPath, 'utf8')
			const packageJson: { scripts?: { [index: string]: string } } = JSON.parse(
				stripJsonComments(packageJsonFile)
			)

			if (typeof packageJson.scripts === 'object') {
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
