import chalk from 'chalk';
import { execSync } from 'child_process';
import { generateModule } from '../cli/generateModule.js';
import { removeModule } from '../cli/removeModule.js';

export function runCommand() {
  const args = process.argv.slice(3);
  const command = args[0];
  const moduleName = args[1];

  if (!command) {
    console.log(chalk.red('Please provide a command to run.'));
    process.exit(1);
  }

  if (command === 'generate:module') {
    if (!moduleName) {
      console.log(chalk.red('Please provide a module name.'));
      process.exit(1);
    }
    generateModule(moduleName);
  } else if (command === 'remove:module') {
    if (!moduleName) {
      console.log(chalk.red('Please provide a module name.'));
      process.exit(1);
    }
    removeModule(moduleName);
  } else if (command === 'dev') {
    try {
      console.log(chalk.green('Starting development server...'));
      execSync('pnpm run dev', { stdio: 'inherit' });
    } catch (error) {
      console.error(chalk.red('Failed to start the development server.'));
      console.error(error.message);
      process.exit(1);
    }
  } else {
    try {
      console.log(chalk.green(`Running command: ${command} ${moduleName || ''}`));
      execSync(`pnpm run ${command} ${moduleName || ''}`, { stdio: 'inherit' });
    } catch (error) {
      console.error(chalk.red(`Failed to run the command "${command}".`));
      console.error(error.message);
      process.exit(1);
    }
  }
}
