import { describe, test, beforeAll, afterAll, expect } from 'vitest'
import { mkdirSync, rmSync, existsSync, writeFileSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import updateRootTsConfig from '../../lib/actions/updateRootTsConfig.js'

const workingDirBase = join(process.cwd(), 'updatetsconfig-test')

const testPaths = {
  'exclude': join(workingDirBase, 'exclude'),
  'no-exclude': join(workingDirBase, 'no-exclude')
}

const cdkPath = "./cdk"
const excludeGlob = join(cdkPath, '**/*')

const tsconfigExcludeJson = JSON.stringify({ exclude: ['something'] })
const tsconfigNoExcludeJson = JSON.stringify({ compilerOptions: { module: "commonjs" } })


describe('add correct scripts to tsconfig.json', () => {

  beforeAll(() => {
    if (existsSync(workingDirBase)) rmSync(workingDirBase, { recursive: true })
    mkdirSync(testPaths['exclude'], { recursive: true })
    mkdirSync(testPaths['no-exclude'], { recursive: true })
    writeFileSync(join(testPaths['exclude'], 'tsconfig.json'), tsconfigExcludeJson)
    writeFileSync(join(testPaths['no-exclude'], 'tsconfig.json'), tsconfigNoExcludeJson)
  })

  afterAll(() => {
    if (existsSync(workingDirBase)) rmSync(workingDirBase, { recursive: true })
  })

  test('update tsconfig.json where an exclude property exists', () => {
    const result = updateRootTsConfig(testPaths['exclude'], cdkPath)
    expect(result).toBe(true)
    const getTsConfigJson = JSON.parse(readFileSync(join(testPaths['exclude'], 'tsconfig.json'), 'utf8'))
    expect(getTsConfigJson).toHaveProperty('exclude')
    expect(getTsConfigJson?.exclude).toContain(excludeGlob)
  })

  test('update tsconfig.json where an exclude property exists', () => {
    const result = updateRootTsConfig(testPaths['no-exclude'], cdkPath)
    expect(result).toBe(true)
    const getTsConfigJson = JSON.parse(readFileSync(join(testPaths['no-exclude'], 'tsconfig.json'), 'utf8'))
    expect(getTsConfigJson).toHaveProperty('exclude')
    expect(getTsConfigJson?.exclude).toContain(excludeGlob)
  })

})
