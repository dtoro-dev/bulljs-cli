import chalk from 'chalk';
import { createProject } from './command/createProject.js';
import { runCommand } from './command/runCommand.js';
import { readFileSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const { name, version } = JSON.parse(readFileSync(`${__dirname}/../package.json`, 'utf8'));

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log(chalk.red('No command provided.'));
  process.exit(1);
}

const command = args[0];

if (command === '-v' || command === '--version') {
  console.log(chalk.green(`${name} version ${version}`));
} else if (command === 'new') {
  const projectNameArg = args[1];
  createProject(projectNameArg);
} else if (command === 'run') {
  runCommand();
} else {
  console.log(chalk.red('Unknown command'));
}
