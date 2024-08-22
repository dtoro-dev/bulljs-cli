import chalk from "chalk";
import { execSync } from "child_process";
import { generateModule } from "../cli/generateModule.js";
import { removeModule } from "../cli/removeModule.js";
import ora from "ora";

export function runCommand() {
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
      generateModule(moduleName);
    } else if (command === "remove:module" || command === "r:m") {
      if (!moduleName) {
        spinner.start();
        spinner.fail("Please provide a module name.");
        process.exit(1);
      }
      removeModule(moduleName);
    } else if (command === "dev") {
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
