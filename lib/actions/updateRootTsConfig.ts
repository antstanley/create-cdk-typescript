import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import stripJsonComments from 'strip-json-comments'

function updateRootTsConfig(currentPath: string, cdkPath: string): boolean {
	// default engine is npm, set that upfront. Only try to detect pnpm and yarn.
	let result = false
	try {
		const excludeGlob = join(cdkPath, '**/*')

		const tsConfigJsonPath = join(currentPath, 'tsconfig.json')
		if (existsSync(tsConfigJsonPath)) {
			const tsConfigString: string = readFileSync(tsConfigJsonPath, 'utf8')
			const tsConfig: { exclude?: string[] } = JSON.parse(
				stripJsonComments(tsConfigString)
			)

			if (typeof tsConfig.exclude === 'object') {
				if (!tsConfig.exclude.includes(excludeGlob))
					tsConfig.exclude.push(excludeGlob)
			} else {
				tsConfig.exclude = [excludeGlob]
			}
			writeFileSync(tsConfigJsonPath, JSON.stringify(tsConfig, null, 2))
			result = true
		} else {
			result = false
			console.warn(
				'Unable to find root tsconfig.json file to add exclude script to',
				currentPath
			)
		}
	} catch (error) {
		console.warn(error)
	}

	return result
}

export default updateRootTsConfig
