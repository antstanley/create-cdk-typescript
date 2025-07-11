import type { Arguments } from 'yargs-parser'
import detectProject from './actions/detectProject.js'
import buildConfig from './buildConfig.js'
import integrateProject from './integrateProject.js'
import newProject from './newProject.js'

function run(args: Arguments): boolean {
	let result = false
	try {
		const config = buildConfig(args)
		const projectExists = detectProject(config.root)

		if (projectExists) {
			result = integrateProject(config)
		} else {
			result = newProject(config)
		}
	} catch (error) {
		console.error(error)
	}
	return result
}

export default run
