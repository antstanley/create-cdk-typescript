import { join } from 'node:path'
import { writeFileSync } from 'node:fs'

const cdkTsConfig = `
  {
    "compilerOptions": {
      "target": "ES2020",
      "module": "commonjs",
      "lib": [
        "es2020",
      ],
      "declaration": true,
      "strict": true,
      "noImplicitAny": true,
      "strictNullChecks": true,
      "noImplicitThis": true,
      "alwaysStrict": true,
      "noUnusedLocals": false,
      "noUnusedParameters": false,
      "noImplicitReturns": true,
      "noFallthroughCasesInSwitch": false,
      "inlineSourceMap": true,
      "inlineSources": true,
      "experimentalDecorators": true,
      "strictPropertyInitialization": false,
      "typeRoots": [
        "./node_modules/@types"
      ]
    },
    "exclude": [
      "node_modules",
      "cdk.out"
    ]
  }
`

function prepareTsConfig(currentPath: string): boolean {
  let result = false
  try {
    writeFileSync(join(currentPath, 'tsconfig.cdk.json'), cdkTsConfig)
    result = true
  } catch (error) {
    console.warn(error)
  }
  return result
}

export default prepareTsConfig
