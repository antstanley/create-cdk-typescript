import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ignoreSnippet = `
# CDK asset staging directory
.cdk.staging
cdk.out
`

function updateGitNpmIgnore(currentPath: string) {

  let result = false;
  try {

    const gitignorePath = join(currentPath, '.gitignore');
    if (existsSync(gitignorePath)) {
      const gitignoreString = readFileSync(gitignorePath, 'utf8');
      if (gitignoreString.indexOf(ignoreSnippet) < 0) {
        const newGitIgnore = gitignoreString + ignoreSnippet
        writeFileSync(gitignorePath, newGitIgnore);
      }
    }
    else {
      writeFileSync(gitignorePath, ignoreSnippet);
    }

    const npmignorePath = join(currentPath, '.npmignore');
    if (existsSync(npmignorePath)) {
      const npmIgnoreString = readFileSync(npmignorePath, 'utf8');
      if (npmIgnoreString.indexOf(ignoreSnippet) < 0) {
        const newNpmIgnore = npmIgnoreString + ignoreSnippet
        writeFileSync(npmignorePath, newNpmIgnore);
      }
    }
    else {
      writeFileSync(npmignorePath, ignoreSnippet);
    }
    result = true

  }
  catch (error) {
    console.warn(error);
  }
  return result;
}
export default updateGitNpmIgnore;
