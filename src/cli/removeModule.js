import chalk from "chalk";
import fs from "fs";
import path from "path";

export function removeModule(moduleName) {
  const moduleDirPath = path.join(process.cwd(), "src", "app", moduleName);
  const testsDirPath = path.join(process.cwd(), "src", "tests", moduleName);

  if (fs.existsSync(moduleDirPath)) {
    fs.rmSync(moduleDirPath, { recursive: true, force: true });
    console.log(
      `Module ${chalk.red(moduleName)} removed from ${chalk.redBright(
        moduleDirPath
      )}.`
    );
  } else {
    console.log(
      `Module ${chalk.red(moduleName)} not found in ${chalk.redBright(
        moduleDirPath
      )}.`
    );
  }

  if (fs.existsSync(testsDirPath)) {
    fs.rmSync(testsDirPath, { recursive: true, force: true });
    console.log(
      `Tests for module ${chalk.red(moduleName)} removed from ${chalk.redBright(
        testsDirPath
      )}.`
    );
  } else {
    console.log(
      `Tests for module ${chalk.red(moduleName)} not found in ${chalk.redBright(
        testsDirPath
      )}.`
    );
  }
}
