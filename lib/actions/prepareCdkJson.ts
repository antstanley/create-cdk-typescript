import { writeFileSync } from 'node:fs'
import { join } from 'node:path'

function prepareCdkJson(currentPath: string, cdkPath: string): boolean {
	let result = false
	try {
		const cdkJson = {
			app: `npx tsx ${cdkPath}/cdk.ts`,
			watch: {
				include: ['**'],
				exclude: [
					'README.md',
					'cdk*.json',
					'**/*.d.ts',
					'**/*.js',
					'tsconfig.json',
					'package*.json',
					'pnpm*.*',
					'yarn.lock',
					'node_modules',
					'test'
				]
			}
		}

		writeFileSync(
			join(currentPath, 'cdk.json'),
			JSON.stringify(cdkJson, null, 2)
		)
		result = true
	} catch (error) {
		console.warn(error)
	}
	return result
}

export default prepareCdkJson
