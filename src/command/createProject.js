import inquirer from "inquirer";
import chalk from "chalk";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import ora from "ora";

// Función para ejecutar comandos de manera asíncrona
function runCommand(command, args, spinner) {
  return new Promise((resolve, reject) => {
    const process = spawn(command, args, { stdio: "ignore", shell: true });

    process.on("close", (code) => {
      if (code !== 0) {
        spinner.fail(`Command failed: ${command} ${args.join(" ")}`);
        reject(new Error(`Command failed with code ${code}`));
      } else {
        resolve();
      }
    });

    process.on("error", (err) => {
      spinner.fail(`Failed to start command: ${command}`);
      reject(err);
    });
  });
}

// Función principal para crear un proyecto
export async function createProject(projectNameArg) {
  let projectName;

  // Pregunta al usuario el nombre del proyecto si no se proporciona como argumento
  if (projectNameArg) {
    projectName = projectNameArg;
  } else {
    const answers = await inquirer.prompt([
      {
        name: "projectName",
        message: "What is the name of your project?",
        default: "bulljs-project",
      },
    ]);
    projectName = answers.projectName;
  }

  const projectPath = path.join(process.cwd(), projectName);

  // Verifica si el directorio ya existe
  if (fs.existsSync(projectPath)) {
    console.log(chalk.red(`Directory ${projectName} already exists.`));
    process.exit(1);
  }

  const spinner = ora();
  const startTime = Date.now();

  try {
    // Comienza a clonar el repositorio
    spinner.start(`Cloning project repository...`);
    await runCommand("git", ["clone", "--depth", "1", "https://github.com/dtoro-dev/bullwork.git", projectName], spinner);
    spinner.succeed(`Project ${projectName} cloned successfully.`);

    // Cambia al directorio del proyecto
    process.chdir(projectPath);

    // Comienza a instalar dependencias
    spinner.start(`Installing dependencies...`);
    await runCommand("pnpm", ["install"], spinner);
    spinner.succeed(`Dependencies installed successfully.`);

    const endTime = Date.now();
    const timeTaken = endTime - startTime;

    spinner.succeed(`Project ${projectName} setup completed in ${timeTaken}ms`);
    console.log(chalk.green(`Project ${projectName} created successfully based on bullwork.`));
    console.log(chalk.blue(`\nTo get started:\n`));
    console.log(chalk.blue(`cd ${projectName}`));
    console.log(chalk.blue(`bull dev`));
    console.log(chalk.blue(`bull run dev`));
  } catch (error) {
    spinner.fail("Failed to create project.");
    console.error(chalk.red(error.message));
    process.exit(1);
  }
}
