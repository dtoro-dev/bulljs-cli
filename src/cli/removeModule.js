import chalk from "chalk";
import fs from "fs";
import path from "path";
import { capitalize } from "../utils/capitalize.js";

export function removeModule(moduleName) {
  const moduleDirPath = path.join(process.cwd(), "src", "app", moduleName);
  const testsDirPath = path.join(process.cwd(), "src", "tests", moduleName);
  const appModulePath = path.join(process.cwd(), "src", "app.module.ts");

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

  if (fs.existsSync(appModulePath)) {
    let appModuleContent = fs.readFileSync(appModulePath, "utf8");

    // Eliminar el import correspondiente al módulo y cualquier línea vacía adicional
    const importRegex = new RegExp(
      `import\\s+{\\s+${capitalize(
        moduleName
      )}Module\\s+}\\s+from\\s+['"]@app\\/${moduleName}\\/${moduleName}\\.module['"];\\n?`,
      "g"
    );
    appModuleContent = appModuleContent.replace(importRegex, "");

    // Eliminar el módulo de la sección de imports
    const importsSectionRegex = new RegExp(
      `\\s*${capitalize(moduleName)}Module,?`,
      "g"
    );
    appModuleContent = appModuleContent.replace(importsSectionRegex, "");

    // Limpiar cualquier línea vacía adicional
    appModuleContent = appModuleContent.replace(/^\s*[\r\n]{2,}/gm, "\n");

    // Asegurar que no quede una línea vacía adicional entre los imports
    appModuleContent = appModuleContent.replace(/\n{2,}/g, "\n");

    // Insertar una línea en blanco antes de @Module si no existe
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

    // Verificar si no quedan más módulos en imports
    const remainingModulesMatch = appModuleContent.match(/imports:\s*\[\s*\]/);

    if (remainingModulesMatch) {
      // Si no quedan módulos, eliminar el archivo app.module.ts
      fs.rmSync(appModulePath, { recursive: true, force: true });
      console.log(
        `Module ${chalk.red(moduleName)} removed from ${chalk.redBright(
          appModulePath
        )}. File ${chalk.redBright("app.module.ts")} deleted.`
      );
    } else {
      // Si quedan otros módulos, solo guardar los cambios
      appModuleContent = appModuleContent.replace(/,\s*]/, "\n  ]"); // Eliminar coma final extra
      fs.writeFileSync(appModulePath, appModuleContent, "utf8");
      console.log(
        `Module ${chalk.red(moduleName)} removed from ${chalk.redBright(
          appModulePath
        )}.`
      );
    }
  }
}
