import { spawn } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import yaml from 'yaml'

const minimalLefthookConfig = {
	'pre-commit': {
		parallel: true,
		commands: {
			lint: {
				glob: '*.{js,ts,mjs,mts,json,svelte}',
				run: 'npx oxlint {staged_files}'
			},
			format: {
				glob: '*.{js,ts,mjs,mts,json,svelte}',
				run: 'npx @Lefthookjs/Lefthook format --write {staged_files} && npx @Lefthookjs/Lefthook check --write {staged_files}'
			}
		}
	}
}

function prepareLefthookConfig(currentPath: string): boolean {
	let result = false
	try {
		// create Lefthook config
		if (!existsSync(currentPath)) mkdirSync(currentPath, { recursive: true })
		const LefthookConfigLocation = join(currentPath, 'Lefthook.json')

		if (!existsSync(LefthookConfigLocation)) {
			writeFileSync(
				LefthookConfigLocation,
				yaml.stringify(minimalLefthookConfig, null, 2)
			)
			result = true
		} else {
			const existingLefthookConfigFile = readFileSync(
				LefthookConfigLocation,
				'utf8'
			)
			const existingLefthookConfig = yaml.parse(existingLefthookConfigFile)
			const mergedLefthookConfig = {
				...existingLefthookConfig,
				...minimalLefthookConfig
			}
			writeFileSync(
				LefthookConfigLocation,
				yaml.stringify(mergedLefthookConfig, null, 2)
			)
			result = true
		}
	} catch (error) {
		console.warn(error)
	}
	return result
}

export default prepareLefthookConfig
