import fs from "fs";
import path from "path";
import {
  getControllerContent,
  getServiceContent,
  getDtoContent,
  getInterfaceContent,
  getTestContent,
  getSwaggerContent,
  getModuleContent,
  getAppModuleContent,
} from "../utils/template.js";
import chalk from "chalk";
import inquirer from "inquirer";
import { capitalize } from "../utils/capitalize.js";
import { SingleBar, Presets } from "cli-progress";

export async function generateModule(moduleName) {
  try {
    // Preguntar al usuario si desea configurar como módulo
    const answers = await inquirer.prompt([
      {
        name: "setupModule",
        message: "Do you want to setup a module?",
        default: "y/N",
      },
    ]);

    const setupModule = ["y", "Y"].includes(answers.setupModule);
    
    console.log(chalk.cyan(`Starting module generation for ${moduleName}...`));

    const startTime = new Date();
    const moduleDirPath = path.join(process.cwd(), "src", "app", moduleName);
    const testsDirPath = path.join(process.cwd(), "src", "tests", moduleName);

    if (!fs.existsSync(moduleDirPath)) {
      fs.mkdirSync(moduleDirPath, { recursive: true });
      console.log(chalk.green(`✔ Module ${moduleName} directory created.`));
    } else {
      console.log(chalk.yellow(`✔ Module ${moduleName} directory already exists.`));
    }

    console.log(chalk.cyan("Preparing to create files..."));

    const filesToCreate = [
      {
        dir: moduleDirPath,
        file: `${moduleName}.controller.ts`,
        content: getControllerContent(moduleName, setupModule),
      },
      {
        dir: moduleDirPath,
        file: `${moduleName}.service.ts`,
        content: getServiceContent(moduleName),
      },
      {
        dir: moduleDirPath,
        file: `${moduleName}.dto.ts`,
        content: getDtoContent(moduleName),
      },
      {
        dir: moduleDirPath,
        file: `${moduleName}.interface.ts`,
        content: getInterfaceContent(moduleName),
      },
      {
        dir: moduleDirPath,
        file: `${moduleName}.swagger.ts`,
        content: getSwaggerContent(moduleName),
      },
    ];

    if (setupModule) {
      console.log(chalk.cyan(`Creating ${moduleName}.module.ts...`));
      filesToCreate.push({
        dir: moduleDirPath,
        file: `${moduleName}.module.ts`,
        content: getModuleContent(moduleName),
      });

      console.log(chalk.cyan('Updating app.module.ts...'));
      const appModulePath = path.join(process.cwd(), "src", "app.module.ts");

      if (!fs.existsSync(appModulePath)) {
        fs.writeFileSync(appModulePath, getAppModuleContent(moduleName), "utf8");
        console.log(chalk.green("✔ app.module.ts created."));
      } else {
        let appModuleContent = fs.readFileSync(appModulePath, "utf8");

        const importStatements = appModuleContent.match(/import .+ from .+;/g);
        const lastImportIndex = appModuleContent.lastIndexOf(
          importStatements[importStatements.length - 1]
        );

        const newImport = `import { ${capitalize(
          moduleName
        )}Module } from "@app/${moduleName}/${moduleName}.module";\n`;
        appModuleContent = [
          appModuleContent.slice(0, lastImportIndex + importStatements[importStatements.length - 1].length + 1),
          newImport,
          appModuleContent.slice(lastImportIndex + importStatements[importStatements.length - 1].length + 1),
        ].join("");

        const importsArrayIndex = appModuleContent.indexOf("imports: [");
        const importsEndIndex = appModuleContent.indexOf("\n  ]", importsArrayIndex);
        const importsSection = appModuleContent.slice(importsArrayIndex, importsEndIndex);
        const newImports = `${importsSection.trimEnd()},\n    ${capitalize(moduleName)}Module`;
        appModuleContent = appModuleContent.replace(importsSection, newImports);

        fs.writeFileSync(appModulePath, appModuleContent, "utf8");
        console.log(chalk.green(`✔ ${capitalize(moduleName)}Module added to app.module.ts.`));
      }
    }

    const progressBar = new SingleBar({
      format: chalk.cyan('Creating files |') + chalk.green('{bar}') + chalk.cyan('| {percentage}% || {value}/{total} Files'),
      barCompleteChar: '\u2588',
      barIncompleteChar: '\u2591',
      hideCursor: true,
    }, Presets.shades_classic);

    progressBar.start(filesToCreate.length, 0);

    filesToCreate.forEach(({ dir, file, content }, index) => {
      const filePath = path.join(dir, file);
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, content, "utf8");
        progressBar.update(index + 1);
      }
    });

    progressBar.stop();

    if (!fs.existsSync(testsDirPath)) {
      fs.mkdirSync(testsDirPath, { recursive: true });
      console.log(chalk.green(`✔ Tests directory created: /${moduleName}`));
    }

    const testFilePath = path.join(testsDirPath, `${moduleName}.test.ts`);
    if (!fs.existsSync(testFilePath)) {
      const testContent = getTestContent(moduleName);
      fs.writeFileSync(testFilePath, testContent, "utf8");
      console.log(chalk.green(`✔ ${moduleName}.test.ts created.`));
    }

    const endTime = new Date();
    const timeTaken = endTime - startTime;

    console.log(chalk.green(`✔ Module generation completed in ${timeTaken}ms.`));
  } catch (error) {
    console.error(chalk.red('Module generation failed.'));
    if (error.isTtyError) {
      console.log(chalk.red("Prompt couldn't be rendered in the current environment."));
    } else if (error.message === "undefined") {
      console.log(chalk.red("Process canceled by the user."));
    } else {
      console.error(chalk.red(error.message));
    }
  }
}
