import fs from "fs";
import path from "path";
import {
  getControllerContent,
  // getRoutesContent,
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

export async function generateModule(moduleName) {
  try {
    const moduleDirPath = path.join(process.cwd(), "src", "app", moduleName);
    const testsDirPath = path.join(process.cwd(), "src", "tests", moduleName);

    const answers = await inquirer.prompt([
      {
        name: "setupModule",
        message: "Do you want to setup a module?",
        default: "y/N",
      },
    ]);

    const setupModule = answers.setupModule === "y";

    if (!fs.existsSync(moduleDirPath)) {
      fs.mkdirSync(moduleDirPath, { recursive: true });
      console.log(`Module ${moduleName} created in ${moduleDirPath}.`);
    }

    const filesToCreate = [
      {
        dir: moduleDirPath,
        file: `${moduleName}.controller.ts`,
        content: getControllerContent(moduleName, setupModule),
      },
      // opcionales
      // {
      //   dir: moduleDirPath,
      //   file: `${moduleName}.routes.ts`,
      //   content: getRoutesContent(moduleName),
      // },
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
      filesToCreate.push({
        dir: moduleDirPath,
        file: `${moduleName}.module.ts`,
        content: getModuleContent(moduleName),
      });

      const appModulePath = path.join(process.cwd(), "src", "app.module.ts");

      if (!fs.existsSync(appModulePath)) {
        fs.writeFileSync(
          appModulePath,
          getAppModuleContent(moduleName),
          "utf8"
        );
        console.log(
          `${chalk.yellow("File created:")} ${chalk.blueBright(
            "app.module.ts"
          )}`
        );
      } else {
        let appModuleContent = fs.readFileSync(appModulePath, "utf8");

        // Buscar la última línea de los imports existentes
        const importStatements = appModuleContent.match(/import .+ from .+;/g);
        const lastImportIndex = appModuleContent.lastIndexOf(
          importStatements[importStatements.length - 1]
        );

        const newImport = `import { ${capitalize(
          moduleName
        )}Module } from "@app/${moduleName}/${moduleName}.module";\n`;
        appModuleContent = [
          appModuleContent.slice(
            0,
            lastImportIndex +
              importStatements[importStatements.length - 1].length +
              1
          ),
          newImport,
          appModuleContent.slice(
            lastImportIndex +
              importStatements[importStatements.length - 1].length +
              1
          ),
        ].join("");

        const importsArrayIndex = appModuleContent.indexOf("imports: [");
        const importsEndIndex = appModuleContent.indexOf(
          "\n  ]",
          importsArrayIndex
        );
        const importsSection = appModuleContent.slice(
          importsArrayIndex,
          importsEndIndex
        );
        const newImports = `${importsSection.trimEnd()},\n    ${capitalize(
          moduleName
        )}Module`;
        appModuleContent = appModuleContent.replace(importsSection, newImports);

        fs.writeFileSync(appModulePath, appModuleContent, "utf8");

        console.log(
          `${chalk.yellow("Module added to app.module.ts:")} ${chalk.blueBright(
            capitalize(moduleName)
          )}`
        );
      }
    }

    filesToCreate.forEach(({ dir, file, content }) => {
      const filePath = path.join(dir, file);
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, content, "utf8");
        console.log(
          `${chalk.yellow("File created:")} ${chalk.blueBright(file)}`
        );
      }
    });

    if (!fs.existsSync(testsDirPath)) {
      fs.mkdirSync(testsDirPath, { recursive: true });
      console.log(
        `${chalk.yellow("Tests directory created:")} /${chalk.blueBright(
          moduleName
        )}`
      );
    }

    const testFilePath = path.join(testsDirPath, `${moduleName}.test.ts`);
    if (!fs.existsSync(testFilePath)) {
      const testContent = getTestContent(moduleName);
      fs.writeFileSync(testFilePath, testContent, "utf8");
      console.log(
        `${chalk.yellow("File created:")} ${chalk.blueBright(
          `${moduleName}.test.ts`
        )}`
      );
    }
  } catch (error) {
    if (error.isTtyError) {
      console.log(
        chalk.red("Prompt couldn't be rendered in the current environment.")
      );
    } else if (error.message === "undefined") {
      console.log(chalk.red("Process canceled by the user."));
    } else {
      // console.error(chalk.red(error));
      console.error(chalk.red(error.message));
    }
  }
}
