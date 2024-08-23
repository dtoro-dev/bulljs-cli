import chalk from "chalk";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { generateModule } from "../cli/generateModule.js";
import { removeModule } from "../cli/removeModule.js";
import ora from "ora";
import inquirer from "inquirer";

export async function runCommand() {
  const args = process.argv.slice(3);
  const command = args[0];
  const moduleName = args[1];

  const spinner = ora();

  if (!command) {
    spinner.start();
    spinner.fail("Please provide a command to run.");
    process.exit(1);
  }

  try {
    if (command === "generate:module" || command === "g:m") {
      if (!moduleName) {
        spinner.start();
        spinner.fail("Please provide a module name.");
        process.exit(1);
      }
      await generateModule(moduleName);
    } else if (command === "remove:module" || command === "r:m") {
      if (!moduleName) {
        spinner.start();
        spinner.fail("Please provide a module name.");
        process.exit(1);
      }
      removeModule(moduleName);
    } else if (command === "dev") {
      const appDirPath = path.join(process.cwd(), "src", "app");
      
      if (!fs.existsSync(appDirPath)) {
        console.log(chalk.yellow("No modules found to map."));
        
        const { createModule } = await inquirer.prompt([
          {
            name: "createModule",
            type: "confirm",
            message: "No modules found. Would you like to create one now?",
            default: true,
          },
        ]);

        if (createModule) {
          const { moduleName } = await inquirer.prompt([
            {
              name: "moduleName",
              type: "input",
              message: "Enter the name of the module:",
            },
          ]);
          await generateModule(moduleName);
        } else {
          console.log(chalk.red("Cannot start the development server without a module."));
          process.exit(1);
        }
      }

      spinner.start("Starting development server...");
      execSync("pnpm run dev", { stdio: "inherit" });
      spinner.succeed("Development server started successfully.");
    } else {
      spinner.start(`Running command: ${command} ${moduleName || ""}`);
      execSync(`pnpm run ${command} ${moduleName || ""}`, { stdio: "inherit" });
      spinner.succeed(`Command "${command}" executed successfully.`);
    }
  } catch (error) {
    spinner.start();
    spinner.fail(`Failed to run the command "${command}".`);
    console.error(chalk.red(error.message));
    process.exit(1);
  }
}
