import { capitalize } from "./capitalize.js";

export function getInterfaceContent(moduleName) {
  return `import { IsString, MinLength } from "@decorators/validation";
  
export class ${capitalize(moduleName)} {
  @IsString()
  @MinLength(5)
  id!: string;
  
  @IsString()
  @MinLength(5)
  name!: string;
}`;
}