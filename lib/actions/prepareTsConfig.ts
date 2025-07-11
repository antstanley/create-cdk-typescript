import { join } from 'node:path'
import { writeFileSync, existsSync, mkdirSync } from 'node:fs'

const cdkTsConfig = {
	compilerOptions: {
		target: 'ES2020',
		module: 'commonjs',
		lib: ['es2020'],
		declaration: true,
		strict: true,
		noImplicitAny: true,
		strictNullChecks: true,
		noImplicitThis: true,
		alwaysStrict: true,
		noUnusedLocals: false,
		noUnusedParameters: false,
		noImplicitReturns: true,
		noFallthroughCasesInSwitch: false,
		inlineSourceMap: true,
		inlineSources: true,
		experimentalDecorators: true,
		strictPropertyInitialization: false,
		typeRoots: ['./node_modules/@types']
	},
	exclude: ['node_modules', 'cdk.out']
}

function prepareTsConfig(currentPath: string, cdkPath: string): boolean {
	let result = false
	try {
		const fullCdkPath = join(currentPath, cdkPath)
		if (!existsSync(fullCdkPath)) mkdirSync(fullCdkPath, { recursive: true })
		writeFileSync(
			join(fullCdkPath, 'tsconfig.json'),
			JSON.stringify(cdkTsConfig, null, 2)
		)
		result = true
	} catch (error) {
		console.warn(error)
	}
	return result
}

export default prepareTsConfig
