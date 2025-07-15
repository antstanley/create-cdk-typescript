import { execSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { join } from 'node:path'

function installLefthook(rootDir: string): boolean {
	// check for existing Git repository
	if (!existsSync(join(rootDir, '.git'))) {
		console.log('Git repository not initiated, skipping Lefthook install')
		return false
	}

	const outputBuffer = execSync('npx lefthook install')

	const outputString = outputBuffer.toString('utf-8')
	console.log(outputString)
	return true
}

export default installLefthook
