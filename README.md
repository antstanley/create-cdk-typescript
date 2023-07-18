# create-cdkts

Bootstrap a Typescript CDK configuration into an existing project, or a new project!

## How

### Getting Started

Run the following command in your project root to bootstrap a CDK configuration with minimal defaults

#### npm

```sh
npx create-cdkts --yes
```

#### yarn

```sh
yarn create cdkts
```

#### pnpm

```sh
pnpm create cdkts
````

This will install the minimal required dependencies, with a minimal configuration into your existing project. It will
 - add your CDK files to the a directory called `cdk/`
 - add a CDK specific `tsconfig.json` to the `cdk/` directory
 - create a `cdk.json` file in your project root
 - add a `deploy` script to your `package.json`
 - add an `exclude` rule for your CDK files in the project root `tsconfig.json` if it exists.
 - Install the minimal required dependencies

 The default configuration will not install a test framework, but you can optionally install one if needed.

 ### Help

 You can get the basic `create-cdkts` options by running

 ```sh
 npx create-cdkts --help
 ```

 This will output the following

 ```

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
 -p, --package-manager <npm|yarn|pnpm|auto>
                                         Explicitely specify the package
                                         manager to use when installing
                                         dependencies. Valid options are npm,
                                         yarn, pnpm and auto detect. Defaults
                                         to auto. If unable to detect any, will
                                         use npm.
 -y, --yes                               Run using all the default settings.
 -h, --help                              Show this help message

 Examples:

 # scaffold a CDK project in the directory 'new-project' to use ES modules
 # with the CDK files placed in ./src/cdk/ directory
 npx create-cdkts --root new-project/ --dir src/cdk

 Notes:

 * If the root directory specified already has a package.json file it will
   intergrate with the existing project and add config into package.json

 * If it detects that there is an existing CDK configuration it will abort
   installation. This behaviour can be toggled with the --overide option

 * The CLI will attempt to determine which package manager is in use on the
   project, if it can't it will default to npm. This behaviour can be
   overridden explicitely through to -p option.

 ```

### New Projects

Currently `create-cdkts` does not bootstrap an entirely new project from scratch. If you want to bootstrap a new CDK project with a minimal configuration simply run the following

```sh

npm init -y
npx create-cdkts -y

```

The `npm init -y` command will bootstrap a new empty project that you can install your CDK dependencies into.


## Why

Why create a new bootstrap for CDK projects? CDK has it's own bootstrap command, but it's limited. `create-cdkts` allows you to integrate CDK into an existing projects easily in a more flexible way. This is ideal when wanting to migrate to CDK, or use CDK to deploy the infrasturcture for modern web frameworks.


### Optional test framework.

Options are `vitest`, `jest` or `none`. If your project is already using a test framework, it won't force one on your. It also adds support for `vitest` which has better TypeScript support, and is more performant than `jest`


### Package Manager Detection

It can detect which package manager is being used, and install dependencies using your preferred package manager. It has support for `npm`, `yarn` and `pnpm`


### Isolated TypeScript configuration

It creates it's own `tsconfig.json` file specifically for CDK. Integrating CDK with other frameworks, especially web frameworks, which have their own TypeScript config can cause conflicts between the two configurations. `create-cdkts` makes it easier to isolate CDK's TypeScript config from the rest of your project.


### Smaller footprint

The default CDK App bootstrap creates multiple files and folders, many of which are unnecessary. `create-cdkts` has a smaller footprint that makes it easy to add and remove it from an existing project.


### What it does

- Creates a single directory with default name `cdk/`, that you can change,  containing
    - `tsconfig.json` with CDK specific settings
    - `cdk.ts` which is your CDK App entry file. This is the entry point into your CDK config will use
    - `stack.ts` a simple example CDK stack configuration

- Adds `cdk.json` file to the root of your project, that is configured to use the `tsconfig.json` configuration and `cdk.ts` entry point in your CDK directory.

- If a `tsconfig.json` configuration exists in your project root folder it will update it to add your CDK directory to the `excludes` property.

- Add a script called `deploy` with the value `cdk deploy -all` to your `package.json` so you can type `npm run deploy` to trigger a CDK deploy.

- Install the following base development dependencies using the package manager already in use in the project. `aws-cdk@latest aws-cdk-lib@latest typescript@latest ts-node@latest`

- Depending on test framework it will install either
    - `vitest@latest` if Vitest is selected
    - `jest@latest ts-jest@latest` if Jest is selected
    - Add a `jest.config.json` file to the project root if `jest` is selected


## Roadmap

- [ ] Add clean install into a new project
- [ ] Add interactive install options
