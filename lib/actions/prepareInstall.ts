
function prepareInstall(engine: string, test: string): string {
  let installString = ''
  try {
    const packages: string[] = ['aws-cdk@latest', 'aws-cdk-lib@latest', 'typescript@latest', 'ts-node@latest']

    if (test === 'vitest') {
      packages.push('vitest@latest')
    } else if (test === 'jest') {
      packages.push('jest@latest')
      packages.push('ts-jest@latest')
    }

    switch (engine) {
      case 'yarn':
        installString = 'yarn add -D ' + packages.join(' ')
        break
      case 'pnpm':
        installString = 'pnpm add -D ' + packages.join(' ')
        break
      default:
        installString = 'npm install -D ' + packages.join(' ')
        break
    }
  } catch (error) {
    console.warn(error)
  }
  return installString

}

export default prepareInstall
