import { spawn } from "node:child_process";
import addScripts from "./actions/addScripts.js";
import createCDKFiles from "./actions/createCDKfiles.js";
import detectPackageManager from "./actions/detectPackageManager.js";
import prepareBiomeConfig from "./actions/prepareBiomeJson.js";
import prepareCdkJson from "./actions/prepareCdkJson.js";
import prepareInstall from "./actions/prepareInstall.js";
import prepareJest from "./actions/prepareJest.js";
import prepareLefthookConfig from "./actions/prepareLefthookYaml.js";
import prepareTsConfig from "./actions/prepareTsConfig.js";
import updateGitNpmIgnore from "./actions/updateGitNpmIgnore.js";

interface ISpawnInstall {
  command: string;
  args: string[];
}

type Command = {
  method: Function;
  params: any[];
  text?: string;
  result?: string | boolean | ISpawnInstall;
};

type Commands = {
  [index: string]: Command;
};

function integrateProject(config: Config): boolean {
  let result = false;
  try {
    const workingPath = config.root;
    const cdkPath = config.dir;

    const installCommand = { command: "npm", args: ["install"] };

    const commands: Commands = {
      addScripts: {
        method: addScripts,
        params: [workingPath, config.test],
        text: "Add deployment script to package.json ...",
      },
      prepareInstall: {
        method: prepareInstall,
        params: [
          detectPackageManager(workingPath, config.packageManager),
          {
            test: config.test,
            biome: config.biome,
            oxlint: config.oxlint,
            lefthook: config.lefthook,
          },
        ],
        text: "Preparing install command ...",
      },
      prepareCdkJson: {
        method: prepareCdkJson,
        params: [workingPath, cdkPath],
        text: "Creating cdk.json file ...",
      },
      prepareJest: { method: prepareJest, params: [workingPath, config.test] },
      prepareTsConfig: {
        method: prepareTsConfig,
        params: [workingPath],
        text: "Adding CDK specific tsconfig.json ...",
      },
      prepareBiomeConfig: {
        method: prepareBiomeConfig,
        params: [workingPath],
        text: "Adding Biome configuration file biome.json ...",
      },
      prepareLefthookConfig: {
        method: prepareLefthookConfig,
        params: [workingPath],
        text: "Adding Lefthook configuration file lefthook.yml ...",
      },
      updateGitNpmIgnore: {
        method: updateGitNpmIgnore,
        params: [workingPath],
        text: "Updating root .gitignore and .npmignore fields to exclude CDK outputs ...",
      },
      createCDKFiles: {
        method: createCDKFiles,
        params: [workingPath, cdkPath, config.name],
        text: `Creating CDK files in ${cdkPath} ...`,
      },
      packageInstall: {
        method: spawn,
        params: [installCommand.command, ...installCommand.args],
        text: `Installing dependencies using ${installCommand.command} ...`,
      },
      gitInit: {
        method: spawn,
        params: ["git", "init"],
        text: `Initiating Git repository ...`,
      },
      installLefthook: {
        method: spawn,
        params: ["npx", "lefthook", "install"],
        text: "Installing Git hooks with Lefthook ...",
      },
    };

    Object.keys(commands).map((key: string) => {
      const { method, params, text } = commands[key];

      let skipStep = false;
      switch (key) {
        case "prepareBiomeConfig":
          skipStep = !config.biome;
          break;
        case "prepareLefthookConfig":
          skipStep = !config.lefthook;
          break;
        case "installLefthook":
          skipStep = !config.lefthook;
          break;
      }

      if (skipStep) {
        console.log(`Skipping ${key} step ...`);
      } else {
        if (text) console.log(text);
        const commandResult = method(...params);
        if (commandResult) {
          commands[key].result = commandResult;
          if (text) console.log(text, "done");
          if ((key = "prepareInstall")) {
            installCommand.command = commandResult.command;
            installCommand.args = commandResult.args;
          }
        } else {
          if (text) console.log(text, "failed");
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
  return result;
}

export default integrateProject;
