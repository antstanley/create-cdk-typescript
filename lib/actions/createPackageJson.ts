import { writeFileSync, existsSync } from 'node:fs'

/**
 * For new projects create a basic package.json file in the root directory with the project name
 */
function createPackageJson(params: {
	name: string
	module: boolean
	location: string
	overWrite?: boolean
}): boolean {
	let result = false
	try {
		const { name, module, location, overWrite } = params

		const packageJson = {
			name,
			type: module ? 'module' : 'commonjs'
		}

		if (typeof overWrite === 'boolean') {
			if (overWrite) {
				writeFileSync(location, JSON.stringify(packageJson, null, 2))
			}
		} else {
			if (!existsSync(location)) {
				writeFileSync(location, JSON.stringify(packageJson, null, 2))
			}
		}
	} catch (error) {
		console.warn(error)
	}
	return result
}

export default createPackageJson
