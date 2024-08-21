import { capitalize } from "./capitalize.js";

export function getModuleContent(moduleName) {
  return `import { Module } from "@decorators/module";
import ${capitalize(
        moduleName
      )}Controller from "./${moduleName}.controller";
import { ${capitalize(moduleName)}Service } from "./${moduleName}.service";

@Module({
    controllers: [${capitalize(moduleName)}Controller],
    providers: [${capitalize(moduleName)}Service],
})

export class ${capitalize(moduleName)}Module {}`
}

export function getAppModuleContent(moduleName) {
  return `import { Module } from "@decorators/module";
import { ${capitalize(moduleName)}Module } from "@app/${moduleName}/${moduleName}.module";

@Module({
  imports: [
    ${capitalize(moduleName)}Module
  ],
})

export class AppModule {}`;
}