enum TestOptions {
  None = 'none',
  Jest = 'jest',
  Vitest = 'vitest',
}

enum PackageOptions {
  Npm = 'npm',
  Yarn = 'yarn',
  Pnpm = 'pnpm',
  Auto = 'auto',
}

type Config = {
  root: string
  dir: string
  test: TestOptions | string
  packageManager: PackageOptions | string
  override?: boolean
}
