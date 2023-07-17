import type { Arguments } from 'yargs-parser'
import { isAbsolute, join } from 'node:path'
import fetchConfig from './fetchConfig.js'

function buildConfig(args: Arguments): Config {
  let config: Config = {
    root: process.cwd(),
    dir: './cdk',
    test: 'none',
    packageManager: 'auto',
    override: false
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

        if (args.dir) {
          config.dir = args.dir
        }

        if (args.test) {
          if (["none", "jest", "vitest"].includes(args.test)) {
            config.test = args.test
          } else {
            console.warn(`Invalid option for option '-t | --test'. ${args?.test} not recognised. Using default ('none').`)
          }
        }

        if (args?.['package-manager']) {
          if (["npm", "yarn", "pnpm", "auto"].includes(args['package-manager'])) {
            config.packageManager = args['package-manager']
          } else {
            console.warn(`Invalid option for option '-p | --package-manager'. ${args?.['package-manager']} not recognised. Using default ('npm')`)
          }
        }
      }
    }
  } catch (error) {
    console.warn(error, "\nUsing default configuration options")
  }

  return config
}

export default buildConfig
