import { isAbsolute, join } from 'node:path'
import { readFileSync, existsSync } from 'node:fs'

const defaultConfig: Config = {
  root: process.cwd(),
  dir: './cdk',
  test: 'none',
  packageManager: 'auto',
}

function validateConfig(configString: string): Config {
  let config = JSON.parse(JSON.stringify(defaultConfig))

  try {
    config = JSON.parse(configString) as Config
  } catch (error) {
    throw new Error('Unable to parse config file as valid JSON')
  }

  // if missing config option, use default config option
  if (!config.root) config.root = defaultConfig.root
  if (!config.dir) config.dir = defaultConfig.dir
  if (!config.test) config.test = defaultConfig.test
  if (!config.packageManager)
    config.packageManager = defaultConfig.packageManager

  // validate config options
  config.root = isAbsolute(config.root)
    ? config.root
    : join(process.cwd(), config.root)
  if (!existsSync(config.root))
    throw new Error(`Cannot find root folder ${config.root}`)

  if (typeof config.dir !== 'string')
    throw new Error(
      `Invalid value for "dir" property. Expected "string", recieved ${typeof config.dir}`,
    )

  if (!['jest', 'vitest', 'none'].includes(config.test))
    throw new Error(
      'Invalid option for "test" property. Must be one of "jest","vitest","none"',
    )

  if (!['npm', 'yarn', 'pnpm', 'auto'].includes(config.packageManager))
    throw new Error(
      'Invalid option for "packageManager" property. Must be one of "npm","yarn","pnpm","auto"',
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
