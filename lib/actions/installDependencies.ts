import { exec } from 'node:child_process'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import installLefthook from './installLefthook.js'

function installDependencies(
	rootDir: string,
	packageManager: string,
	installCommands: string[]
): boolean {
	// check for existing Git repository
	if (!existsSync(join(rootDir, 'package.json'))) {
		console.log('package.json does not exist, skipping dependency install')
		return false
	}
	if (['yarn', 'pnpm', 'npm'].includes(packageManager)) {
		const install = `${packageManager} ${installCommands.join(' ')}`

		const execStream = exec(install)

		execStream.on('message', (msg) => console.log(msg.toString()))
		execStream.on('error', (err) =>
			console.error(
				'Dependency Install Error\n',
				`Install Command: ${install}\n`,
				err.stack,
				err.cause,
				err.message
			)
		)
		execStream.on('close', () => installLefthook(rootDir))
	}
	return true
}

export default installDependencies
