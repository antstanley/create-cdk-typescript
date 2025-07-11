enum TestOptions {
	None = 'none',
	Jest = 'jest',
	Vitest = 'vitest'
}

enum PackageOptions {
	Npm = 'npm',
	Yarn = 'yarn',
	Pnpm = 'pnpm',
	Auto = 'auto'
}

type Config = {
	name?: string
	root: string
	dir: string
	test: TestOptions | string
	packageManager: PackageOptions | string
	override?: boolean
	bootstrap?: boolean
	oxlint: boolean
	biome: boolean
	lefthook: boolean
}
