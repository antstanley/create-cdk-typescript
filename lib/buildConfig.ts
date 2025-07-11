import { isAbsolute, join } from 'node:path'
import type { Arguments } from 'yargs-parser'
import fetchConfig from './fetchConfig.js'

function buildConfig(args: Arguments): Config {
	let config: Config = {
		name: process.cwd().replace(/\/$/, '').split('/').pop(),
		root: process.cwd(),
		dir: './cdk',
		test: 'none',
		packageManager: 'auto',
		override: false,
		oxlint: true,
		lefthook: true,
		biome: true
	}
	try {
		// check if config file is specified, if it is use that exclusively
		if (args?.config) {
			config = fetchConfig(args?.config)
		} else {
			// if 'yes' option specified, use default config, ignore all other options
			if (!args.yes) {
				if (args?.root) {
					if (isAbsolute(args.root)) {
						config.root = args.root
					} else {
						config.root = join(process.cwd(), args.root)
					}
				}

				if (args.name) {
					config.name = args.name
				}

				if (args.dir) {
					config.dir = args.dir
				}

				if (args.test) {
					if (['none', 'jest', 'vitest'].includes(args.test)) {
						config.test = args.test
					} else {
						console.warn(
							`Invalid option for option '-t | --test'. ${args?.test} not recognised. Using default ('none').`
						)
					}
				}

				if (args?.packageManager) {
					if (['npm', 'yarn', 'pnpm', 'auto'].includes(args.packageManager)) {
						config.packageManager = args.packageManager
					} else {
						console.warn(
							`Invalid option for option '-p | --package-manager'. ${args?.packageManager} not recognised. Using default ('npm')`
						)
					}
				}

				if (args?.oxlint) {
					if (args?.oxlint === 'no' || args?.oxlint === 'n') {
						config.oxlint = false
					}
				}

				if (args?.biome) {
					if (args?.biome === 'no' || args?.biome === 'n') {
						config.oxlint = false
					}
				}

				if (args?.lefthook) {
					if (args?.lefthook === 'no' || args?.lefthook === 'n') {
						config.oxlint = false
					}
				}
			}
		}
	} catch (error) {
		console.warn(error, '\nUsing default configuration options')
	}

	return config
}

export default buildConfig
