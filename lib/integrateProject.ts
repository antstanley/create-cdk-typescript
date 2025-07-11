import { spawn } from 'node:child_process'
import addScripts from './actions/addScripts.js'
import createCDKFiles from './actions/createCDKfiles.js'
import detectPackageManager from './actions/detectPackageManager.js'
import prepareCdkJson from './actions/prepareCdkJson.js'
import prepareInstall from './actions/prepareInstall.js'
import prepareJest from './actions/prepareJest.js'
import prepareTsConfig from './actions/prepareTsConfig.js'
import updateGitNpmIgnore from './actions/updateGitNpmIgnore.js'
import updateRootTsConfig from './actions/updateRootTsConfig.js'

interface ISpawnInstall {
	command: string
	args: string[]
}

type Commands = {
	[index: string]: {
		method: Function
		params: any[]
		text?: string
		result?: string | boolean | ISpawnInstall
	}
}

function integrateProject(config: Config): boolean {
	let result = false
	try {
		const workingPath = config.root
		const cdkPath = config.dir

		const commands: Commands = {
			addScripts: {
				method: addScripts,
				params: [workingPath, config.test],
				text: 'Add deployment script to package.json ...'
			},
			prepareInstall: {
				method: prepareInstall,
				params: [
					detectPackageManager(workingPath, config.packageManager),
					{
						test: config.test,
						biome: config.biome,
						oxlint: config.oxlint,
						lefthook: config.lefthook
					}
				],
				text: 'Preparing install command ...'
			},
			prepareCdkJson: {
				method: prepareCdkJson,
				params: [workingPath, cdkPath],
				text: 'Creating cdk.json file ...'
			},
			prepareJest: { method: prepareJest, params: [workingPath, config.test] },
			prepareTsConfig: {
				method: prepareTsConfig,
				params: [workingPath, cdkPath],
				text: 'Adding CDK specific tsconfig.json ...'
			},
			updateRootTsConfig: {
				method: updateRootTsConfig,
				params: [workingPath, cdkPath],
				text: 'Updating root tsconfig.json to exclude CDK scripts ...'
			},
			updateGitNpmIgnore: {
				method: updateGitNpmIgnore,
				params: [workingPath],
				text: 'Updating root .gitignore and .npmignore fields to exclude CDK outputs ...'
			},
			createCDKFiles: {
				method: createCDKFiles,
				params: [workingPath, cdkPath, config.name],
				text: `Creating CDK files in ${cdkPath} ...`
			}
		}

		Object.keys(commands).map((commandKey: string) => {
			const { method, params, text } = commands[commandKey]

			if (text) console.log(text)
			const commandResult = method(...params)
			if (commandResult) {
				commands[commandKey].result = commandResult
				if (text) console.log(text, 'done')
			} else {
				if (text) console.log(text, 'failed')
			}
		})

		if (typeof commands.prepareInstall?.result === 'object') {
			console.log('Installing dependencies ...')
			console.log(
				commands.prepareInstall?.result.command,
				commands.prepareInstall?.result.args.join(' ')
			)
			const spawnProcess = spawn(
				commands.prepareInstall?.result.command,
				commands.prepareInstall?.result.args
			)
			spawnProcess.stdout.on('data', (data) => {
				console.log(data.toString())
			})
			spawnProcess.stdout.on('end', () => {
				console.log('Installing dependencies ... done')
			})
		}
	} catch (error) {
		console.error(error)
	}
	return result
}

export default integrateProject
