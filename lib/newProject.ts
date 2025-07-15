import { execSync } from 'node:child_process'

import integrateProject from './integrateProject.js'

function newProject(config: Config): boolean {
	let result = false
	try {
		execSync('git init')
		console.log('Git repository initialised')
		integrateProject(config)
	} catch {}
	return result
}

export default newProject
