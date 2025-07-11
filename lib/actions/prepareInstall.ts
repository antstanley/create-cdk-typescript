function prepareInstall(
	command: string,
	optionalDeps: {
		test: string
		oxlint: boolean
		biome: boolean
		lefthook: boolean
	}
): { command: string; args: string[] } {
	let args: string[] = []
	try {
		args = [
			'aws-cdk@latest',
			'aws-cdk-lib@latest',
			'constructs@latest',
			'typescript@latest',
			'tsx@latest'
		]

		const { test, biome, lefthook, oxlint } = optionalDeps

		if (test === 'vitest') {
			args.push('vitest@latest')
		} else if (test === 'jest') {
			args.push('jest@latest')
			args.push('ts-jest@latest')
		}

		if (oxlint) {
			args.push('oxlint@latest')
		}

		if (lefthook) {
			args.push('lefthook@latest')
		}

		if (biome) {
			args.push('@biomejs/biome@latest')
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
