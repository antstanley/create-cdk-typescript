import { describe, test, beforeAll, afterAll, expect } from 'vitest'
import { mkdirSync, rmSync, existsSync, writeFileSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import prepareCdkJson from '../../lib/actions/prepareCdkJson.js'

const workingDirBase = join(process.cwd(), 'prepare-cdkjson')

const cdkPath = './cdk'
const expectedCommand = "npx ts-node --project ./cdk/tsconfig.json  --prefer-ts-exts ./cdk/index.ts"

describe('add cdk.json file referencing correct script location', () => {

  beforeAll(() => {
    if (existsSync(workingDirBase)) rmSync(workingDirBase, { recursive: true })
    mkdirSync(workingDirBase, { recursive: true })
  })

  afterAll(() => {
    //if (existsSync(workingDirBase)) rmSync(workingDirBase, { recursive: true })
  })

  test('create cdk.json in correct location', () => {
    const result = prepareCdkJson(workingDirBase, cdkPath)
    expect(result).toBe(true)
    const getCdkJson = JSON.parse(readFileSync(join(workingDirBase, 'cdk.json'), 'utf8'))
    expect(getCdkJson).toHaveProperty('app')
    expect(getCdkJson?.app).toBe(expectedCommand)
  })

})
