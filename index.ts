import process from 'node:process';
import argParser from 'yargs-parser';
import { commandAliases } from './lib/commandAliases.js'
import help from './lib/help.js'

function cli(): void {
  const command = argParser(process.argv.slice(2), {
    alias: commandAliases,
    configuration: { 'camel-case-expansion': false }
  });

  if (command.help || (process.argv.length <= 2 && process.stdin.isTTY)) {
    console.log(`\n${help}\n`);
  } else {
    console.log('Interactive configuration');
  }
}


export { cli }
