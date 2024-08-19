import chalk from "chalk";
import { createProject } from "./command/createProject.js";
import { runCommand } from "./command/runCommand.js";
import { readFileSync } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

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

if (command === "-v" || command === "--version") {
  console.log(chalk.green(`${name} version ${version}`));
} else if (command === "new") {
  const projectNameArg = args[1];
  createProject(projectNameArg);
} else if (command === "run") {
  const subCommand = args.slice(1).join(" ");
  runCommand(subCommand);
} else if (command === "dev") {
  try {
    console.log(chalk.green("Starting development server..."));
    execSync("pnpm run dev", { stdio: "inherit" });
  } catch (error) {
    console.error(chalk.red("Failed to start the development server."));
    console.error(error.message);
  }
} else if (command === "install") {
  const packageName = args[1];
  if (!packageName) {
    console.log(chalk.green(`Installing dependencies...`));
    execSync(`pnpm install`, { stdio: "inherit" });
    console.log(chalk.green(`Installed dependencies successfully.`));
    process.exit(1);
  }

  try {
    console.log(chalk.green(`Installing ${packageName}...`));
    execSync(`pnpm install ${packageName}`, { stdio: "inherit" });
    console.log(chalk.green(`${packageName} installed successfully.`));
  } catch (error) {
    console.error(chalk.red(`Failed to install ${packageName}.`));
    console.error(error.message);
  }
}else if(command === "remove") {
  const packageName = args[1];
  if (!packageName) {
    console.log(chalk.red("Please provide a package name to remove."));
    process.exit(1);
  }

  try {
    console.log(chalk.green(`Removing ${packageName}...`));
    execSync(`pnpm remove ${packageName}`, { stdio: "inherit" });
    console.log(chalk.green(`${packageName} removed successfully.`));
  } catch (error) {
    console.error(chalk.red(`Failed to remove ${packageName}.`));
    console.error(error.message);
  }

} else if(command === "build") {
  try {
    console.log(chalk.green("Building project..."));
    execSync("pnpm run build", { stdio: "inherit" });
    console.log(chalk.green("Project built successfully."));
  } catch (error) {
    console.error(chalk.red("Failed to build the project."));
    console.error(error.message);
  }

} else {
  console.log(chalk.red("Unknown command"));
}
