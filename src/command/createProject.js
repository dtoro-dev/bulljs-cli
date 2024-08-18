import inquirer from 'inquirer';
import chalk from 'chalk';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

export async function createProject(projectNameArg) {
  let projectName;

  if (projectNameArg) {
    projectName = projectNameArg;
  } else {
    const answers = await inquirer.prompt([
      {
        name: 'projectName',
        message: 'What is the name of your project?',
        default: 'bulljs-project',
      },
    ]);
    projectName = answers.projectName;
  }

  const projectPath = path.join(process.cwd(), projectName);

  if (fs.existsSync(projectPath)) {
    console.log(chalk.red(`Directory ${projectName} already exists.`));
    process.exit(1);
  }

  console.log(chalk.green(`Creating project ${projectName}...`));

  try {
    execSync(`git clone https://github.com/dtoro-dev/bullwork.git ${projectName}`, { stdio: 'inherit' });
  } catch (error) {
    console.error(chalk.red('Failed to clone repository:', error.message));
    process.exit(1);
  }

  // Cambiar al directorio del proyecto
  process.chdir(projectPath);

  // Instalar dependencias
  console.log(chalk.green(`Installing dependencies...`));
  execSync(`pnpm install`, { stdio: 'inherit' });

  console.log(chalk.green(`Project ${projectName} created successfully based on bullwork.`));
  console.log(chalk.blue(`\nTo get started:\n`));
  console.log(chalk.blue(`cd ${projectName}`));
  console.log(chalk.blue(`pnpm run dev`));
}
