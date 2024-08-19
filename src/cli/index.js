import chalk from "chalk";
import { generateModule } from "./generateModule.js";
import { removeModule } from "./removeModule.js";

const command = process.argv[2];
const moduleName = process.argv[3];

if (!moduleName) {
  console.error(chalk.red("Module name is required."));
  process.exit(1);
}

if (command === "generate:module") {
  generateModule(moduleName);
} else if (command === "remove:module") {
  removeModule(moduleName);
} else {
  console.log(chalk.red("Unknown command."));
}
