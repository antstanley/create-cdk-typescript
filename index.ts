import process from 'node:process'
import argParser from 'yargs-parser'
import { commandAliases } from './lib/commandAliases.js'
import help from './lib/help.js'
import run from './lib/run.js'

function cli(): void {
	const command = argParser(process.argv.slice(2), {
		alias: commandAliases,
		configuration: { 'camel-case-expansion': true },
		boolean: ['y'],
		string: ['c', 'n', 'r', 'd', 't', 'p'],
		normalize: ['c']
	})

	if (command.help) {
		console.log(`\n${help}\n`)
	} else if (command) {
		run(command)
	} else {
		console.log('Interactive configuration')
	}
}

export { cli }
