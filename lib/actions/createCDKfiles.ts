import { join } from 'node:path'
import { writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { pascalCase, camelCase } from "change-case"

function createCDKFiles(currentPath: string, cdkPath: string, name: string): boolean {

  const className = pascalCase(name)
  const stackFileName = camelCase(`${name}Stack`)

  const stackFile = `
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class ${className} extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, '${pascalCase(name)}Queue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}`

  const appFile = `
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ${className} } from './${stackFileName}';

const app = new cdk.App();
new ${className}(app, '${name}', {
/* If you don't specify 'env', this stack will be environment-agnostic.
* Account/Region-dependent features and context lookups will not work,
* but a single synthesized template can be deployed anywhere. */

/* Uncomment the next line to specialize this stack for the AWS Account
* and Region that are implied by the current CLI configuration. */
// env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

/* Uncomment the next line if you know exactly what Account and Region you
* want to deploy the stack to. */
// env: { account: '123456789012', region: 'us-east-1' },

/* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});
`

  let result = false
  try {
    const fullCdkPath = join(currentPath, cdkPath)
    if (!existsSync(fullCdkPath)) mkdirSync(fullCdkPath, { recursive: true })

    writeFileSync(
      join(fullCdkPath, `${stackFileName}.ts`),
      stackFile, 'utf8'
    )

    writeFileSync(
      join(fullCdkPath, `cdk.ts`),
      appFile, 'utf8'
    )
    result = true
  } catch (error) {
    console.warn(error)
  }
  return result
}

export default createCDKFiles
