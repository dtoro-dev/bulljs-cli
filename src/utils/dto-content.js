import { capitalize } from "./capitalize.js";

export function getDtoContent(moduleName) {
  return `import { IsOptional, IsString, MinLength } from "@decorators/validation";

export class Create${capitalize(moduleName)}Dto {
  @IsString()
  @MinLength(5)
  name!: string;
}

export class Update${capitalize(moduleName)}Dto {
  @IsString()
  @MinLength(5)
  @IsOptional()
  name?: string;
}`;
}
