import process from 'node:process';
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import argParser from 'yargs-parser';
import { commandAliases } from './lib/commandAliases.js'

let help = ''

function cli(): void {
  const command = argParser(process.argv.slice(2), {
    alias: commandAliases,
    configuration: { 'camel-case-expansion': false }
  });



  if (command.help || (process.argv.length <= 2 && process.stdin.isTTY)) {
    if (!help) {
      const currentDir = dirname(fileURLToPath(import.meta.url))
      console.log(currentDir)
      const helpDir = join(currentDir, 'lib', 'help.md')
      console.log(helpDir)
      help = readFileSync(helpDir, 'utf8')
      console.log(help)
    }
    console.log(`\n${help}\n`);
  } else {
    console.log('Interactive configuration');
  }
}


export { cli }
