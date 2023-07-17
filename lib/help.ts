const help = `
  create cdk typescript
  =====================================

  Usage: npx create-cdkts [options]

  If no options are specified the CLI will enter interactive mode and ask
  configuration questions.

  Basic options:

  -c, --config <filename>                 Use a config file instead of CLI
                                          options
  -r, --root <dirname>                    The root directory of the project you
                                          want to configure CDK for. Defaults
                                          to the current working directory.
  -d, --dir <dirname>                     Directory to write CDK template
                                          files to. Defaults to "./cdk"
  -t, --test <vitest|jest|none>           Which test framework to include.
                                          Default  is none.
  -e, --esm                               Set CDK up to use ES modules. By
                                          default CDK transpiles to CommonJS.
  -p, --package-manager <npm|yarn|pnpm|auto>
                                          Explicitely specify the package
                                          manager to use when installing
                                          dependencies. Valid options are npm,
                                          yarn, pnpm and auto detect. Defaults
                                          to auto. If unable to detect any, will
                                          use npm.
  -o, --override                          Override existing CDK configuration
  -y, --yes                               Run using all the default settings.
  -h, --help                              Show this help message

  Examples:

  # scaffold a CDK project in the directory 'new-project' to use ES modules
  # with the CDK files placed in ./src/cdk/ directory
  npx create-cdkts --root new-project/ --dir src/cdk --esm

  Notes:

  * If the root directory specified already has a package.json file it will
    intergrate with the existing project and add config into package.json

  * If it detects that there is an existing CDK configuration it will abort
    installation. This behaviour can be toggled with the --overide option

  * The CLI will attempt to determine which package manager is in use on the
    project, if it can't it will default to npm. This behaviour can be
    overridden explicitely through to -p option.
`

export default help
