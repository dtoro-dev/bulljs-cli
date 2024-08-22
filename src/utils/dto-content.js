import { capitalize } from "./capitalize.js";

export function getDtoContent(moduleName) {
  return `import { IsOptional, IsString, MinLength, DocProperty } from "@decorators/index";

export class Create${capitalize(moduleName)}Dto {
  @DocProperty({
    description: 'The name of the project',
    example: 'Project Alpha',
    required: true,
    type: String,
  })
  @IsString()
  @MinLength(5)
  name!: string;
}

export class Update${capitalize(moduleName)}Dto {
  @DocProperty({
    description: 'The name of the project',
    example: 'Project Alpha Updated',
    type: String,
  })
  @IsString()
  @MinLength(5)
  @IsOptional()
  name?: string;
}`;
}
