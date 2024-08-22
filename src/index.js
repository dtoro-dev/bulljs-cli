import chalk from "chalk";
import { createProject } from "./command/createProject.js";
import { runCommand } from "./command/runCommand.js";
import { readFileSync } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";
import ora from "ora";

const __dirname = dirname(fileURLToPath(import.meta.url));
const { name, version } = JSON.parse(
  readFileSync(`${__dirname}/../package.json`, "utf8")
);

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log(chalk.red("No command provided."));
  process.exit(1);
}

const command = args[0];
const spinner = ora()

try {
  if (command === "-v" || command === "--version") {
    spinner.start();
    spinner.succeed(`${name} version ${version}`);
  } else if (command === "new") {
    const projectNameArg = args[1];
    createProject(projectNameArg);
  } else if (command === "run") {
    const subCommand = args.slice(1).join(" ");
    runCommand(subCommand);
  } else if (command === "dev") {
    spinner.start();
    spinner.start("Starting development server...");
    execSync("pnpm run dev", { stdio: "inherit" });
    spinner.succeed("Development server started successfully.");
  } else if (command === "install") {
    const packageName = args[1];
    if (!packageName) {
      spinner.start();
      spinner.start("Installing dependencies...");
      execSync(`pnpm install`, { stdio: "inherit" });
      spinner.succeed("Dependencies installed successfully.");
      process.exit(1);
    }

    spinner.start(`Installing ${packageName}...`);
    execSync(`pnpm install ${packageName}`, { stdio: "inherit" });
    spinner.succeed(`${packageName} installed successfully.`);
  } else if (command === "remove") {
    const packageName = args[1];
    if (!packageName) {
      spinner.fail("Please provide a package name to remove.");
      process.exit(1);
    }

    spinner.start(`Removing ${packageName}...`);
    execSync(`pnpm remove ${packageName}`, { stdio: "inherit" });
    spinner.succeed(`${packageName} removed successfully.`);
  } else if (command === "build") {
    spinner.start("Building project...");
    execSync("pnpm run build", { stdio: "inherit" });
    spinner.succeed("Project built successfully.");
  } else {
    spinner.fail("Unknown command");
  }
} catch (error) {
  spinner.fail("Command execution failed.");
  console.error(chalk.red(error.message));
  process.exit(1);
}
