import chalk from 'chalk';
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
  } else {
    console.log(chalk.red(`Unknown command "${command}".`));
    process.exit(1);
  }
}
