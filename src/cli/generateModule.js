import fs from "fs";
import path from "path";
import {
  getControllerContent,
  getRoutesContent,
  getServiceContent,
  getDtoContent,
  getInterfaceContent,
  getTestContent,
  getSwaggerContent,
} from "../utils/template.js";
import chalk from "chalk";

export function generateModule(moduleName) {
  const moduleDirPath = path.join(process.cwd(), "src", "app", moduleName);
  const testsDirPath = path.join(process.cwd(), "src", "tests", moduleName);

  if (!fs.existsSync(moduleDirPath)) {
    fs.mkdirSync(moduleDirPath, { recursive: true });
    console.log(`Module ${moduleName} created in ${moduleDirPath}.`);
  }

  const filesToCreate = [
    {
      dir: moduleDirPath,
      file: `${moduleName}.controller.ts`,
      content: getControllerContent(moduleName),
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

  filesToCreate.forEach(({ dir, file, content }) => {
    const filePath = path.join(dir, file);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, content, "utf8");
      console.log(`${chalk.yellow("File created:")} ${chalk.blueBright(file)}`);
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
}
