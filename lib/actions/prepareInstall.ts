function prepareInstall(command: string, test: string): { command: string, args: string[] } {
  let args: string[] = []
  try {
    args = ['aws-cdk@latest', 'aws-cdk-lib@latest', 'typescript@latest', 'ts-node@latest']

    if (test === 'vitest') {
      args.push('vitest@latest')
    } else if (test === 'jest') {
      args.push('jest@latest')
      args.push('ts-jest@latest')
    }

    switch (command) {
      case 'yarn':
        args.unshift('add', '-D')
        break
      case 'pnpm':
        args.unshift('add', '-D')
        break
      default:
        args.unshift('install', '-D')
        break
    }
  } catch (error) {
    console.warn(error)
  }
  return { command, args }
}

export default prepareInstall
