import chalk from "chalk";
import fs from "fs";
import path from "path";
import ora from "ora";
import { capitalize } from "../utils/capitalize.js";

export function removeModule(moduleName) {
  const startTime = new Date();
  
  const spinner = ora(`Starting removal of module ${moduleName}...`).start();
  
  const moduleDirPath = path.join(process.cwd(), "src", "app", moduleName);
  const testsDirPath = path.join(process.cwd(), "src", "tests", moduleName);
  const appModulePath = path.join(process.cwd(), "src", "app.module.ts");

  try {
    if (fs.existsSync(moduleDirPath)) {
      fs.rmSync(moduleDirPath, { recursive: true, force: true });
      spinner.succeed(`Module ${chalk.red(moduleName)} removed from ${chalk.redBright(moduleDirPath)}.`);
    } else {
      spinner.info(`Module ${chalk.red(moduleName)} not found in ${chalk.redBright(moduleDirPath)}.`);
    }

    if (fs.existsSync(testsDirPath)) {
      fs.rmSync(testsDirPath, { recursive: true, force: true });
      spinner.succeed(`Tests for module ${chalk.red(moduleName)} removed from ${chalk.redBright(testsDirPath)}.`);
    } else {
      spinner.info(`Tests for module ${chalk.red(moduleName)} not found in ${chalk.redBright(testsDirPath)}.`);
    }

    if (fs.existsSync(appModulePath)) {
      let appModuleContent = fs.readFileSync(appModulePath, "utf8");

      const importRegex = new RegExp(
        `import\\s+{\\s+${capitalize(
          moduleName
        )}Module\\s+}\\s+from\\s+['"]@app\\/${moduleName}\\/${moduleName}\\.module['"];\\n?`,
        "g"
      );
      appModuleContent = appModuleContent.replace(importRegex, "");

      const importsSectionRegex = new RegExp(
        `\\s*${capitalize(moduleName)}Module,?`,
        "g"
      );

      appModuleContent = appModuleContent.replace(importsSectionRegex, "");
      appModuleContent = appModuleContent.replace(/^\s*[\r\n]{2,}/gm, "\n");
      appModuleContent = appModuleContent.replace(/\n{2,}/g, "\n");

      const moduleDecoratorIndex = appModuleContent.indexOf("@Module");
      if (
        moduleDecoratorIndex > 0 &&
        appModuleContent.charAt(moduleDecoratorIndex - 1) !== "\n"
      ) {
        appModuleContent =
          appModuleContent.slice(0, moduleDecoratorIndex) +
          "\n" +
          appModuleContent.slice(moduleDecoratorIndex);
      }

      const remainingModulesMatch = appModuleContent.match(/imports:\s*\[\s*\]/);

      if (remainingModulesMatch) {
        fs.rmSync(appModulePath, { recursive: true, force: true });
        spinner.succeed(`File ${chalk.redBright("app.module.ts")} deleted.`);
      } else {
        appModuleContent = appModuleContent.replace(/,\s*]/, "\n  ]");
        fs.writeFileSync(appModulePath, appModuleContent, "utf8");
        spinner.succeed(`Module ${chalk.red(moduleName)} removed from ${chalk.redBright(appModulePath)}.`);
      }

      const endTime = new Date();
      const timeTaken = endTime - startTime;

      spinner.succeed(`Module ${chalk.red(moduleName)} removed in ${chalk.greenBright(timeTaken)}ms.`);
    } else {
      spinner.info(`No app.module.ts file found to update.`);
    }
  } catch (error) {
    spinner.fail(`Failed to remove module ${moduleName}.`);
    console.error(chalk.red(error.message));
  }
}
