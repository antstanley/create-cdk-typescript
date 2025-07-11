import { existsSync, readFileSync } from 'node:fs'
import { isAbsolute, join } from 'node:path'

const defaultConfig: Config = {
	name: process.cwd().replace(/\/$/, '').split('/').pop(),
	root: process.cwd(),
	dir: './cdk',
	test: 'none',
	packageManager: 'auto',
	oxlint: true,
	biome: true,
	lefthook: true
}

function validateConfig(configString: string): Config {
	let config = JSON.parse(JSON.stringify(defaultConfig))

	try {
		config = JSON.parse(configString) as Config
	} catch {
		throw new Error('Unable to parse config file as valid JSON')
	}

	// if missing config option, use default config option
	if (!config.name) config.name = defaultConfig.name
	if (!config.root) config.root = defaultConfig.root
	if (!config.dir) config.dir = defaultConfig.dir
	if (!config.test) config.test = defaultConfig.test
	if (!config.packageManager)
		config.packageManager = defaultConfig.packageManager
	if (!config.oxlint) config.oxlint = defaultConfig.oxlint
	if (!config.biome) config.oxlint = defaultConfig.biome
	if (!config.lefthook) config.oxlint = defaultConfig.lefthook

	// validate config options
	config.root = isAbsolute(config.root)
		? config.root
		: join(process.cwd(), config.root)
	if (!existsSync(config.root))
		throw new Error(`Cannot find root folder ${config.root}`)

	if (typeof config.dir !== 'string')
		throw new Error(
			`Invalid value for "dir" property. Expected "string", recieved ${typeof config.dir}`
		)

	if (!['jest', 'vitest', 'none'].includes(config.test))
		throw new Error(
			'Invalid option for "test" property. Must be one of "jest","vitest","none"'
		)

	if (!['npm', 'yarn', 'pnpm', 'auto'].includes(config.packageManager))
		throw new Error(
			'Invalid option for "packageManager" property. Must be one of "npm","yarn","pnpm","auto"'
		)

	return config
}

function fetchConfig(configPath: string): Config {
	const workingPath = isAbsolute(configPath)
		? configPath
		: join(process.cwd(), configPath)

	if (!existsSync)
		throw new Error(`Unable to load config from path ${workingPath}`)

	return validateConfig(readFileSync(workingPath, 'utf8'))
}

export default fetchConfig
