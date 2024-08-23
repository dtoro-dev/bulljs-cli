import { capitalize } from "./capitalize.js";

const controllerModularContent = (setupModule, serviceName) => {
  return setupModule
    ? `constructor(private readonly ${serviceName}: ${capitalize(serviceName)}) {}`
    : `@Inject(${capitalize(serviceName)})
  private ${serviceName}!: ${capitalize(serviceName)};
  
  constructor() {}`;
};

export const getControllerContent = (moduleName, setupModule = false) => {
  const className = capitalize(moduleName) + "Controller";
  const serviceName = moduleName + "Service";
  return `import { ${capitalize(serviceName)} } from './${moduleName}.service';
import { Create${capitalize(moduleName)}Dto, Update${capitalize(
    moduleName
  )}Dto } from './${moduleName}.dto';
import { Request, Response } from "express";
import { Delete, Get, Post, Put } from "@decorators/routing";
import { Body, Param, Req, Res } from "@decorators/params";
import { Controller } from "@decorators/controller";
${setupModule ? "" : 'import { Inject } from "@decorators/injectable";\n'}
@Controller('/${moduleName}')
class ${className} {
  ${controllerModularContent(setupModule, serviceName)}
  
  @Get("/")
  async getAll(@Req() req: Request, @Res() res: Response): Promise<void> {
    const data = await this.${serviceName}.findAll();
    res.json(data);
  }

  @Get("/:id")
  async getOne(@Param("id") id: string, @Res() res: Response): Promise<void> {
    const data = await this.${serviceName}.findOne(id);
    res.json(data);
  }

  @Post("/")
  async create(
    @Body(Create${capitalize(moduleName)}Dto) dto: Create${capitalize(
    moduleName
  )}Dto,
    @Res() res: Response
  ): Promise<void> {
    const data = await this.${serviceName}.create(dto);
    res.status(201).json(data);
  }

  @Put("/:id")
  async update(
    @Param("id") id: string,
    @Body(Update${capitalize(moduleName)}Dto) dto: Update${capitalize(
    moduleName
  )}Dto,
    @Res() res: Response
  ): Promise<void> {
    const data = await this.${serviceName}.update(id, dto);
    res.json(data);
  }

  @Delete("/:id")
  async delete(@Param("id") id: string, @Res() res: Response): Promise<void> {
    await this.${serviceName}.delete(id);
    res.status(204).send();
  }
}
  
export default ${className};
`;
};
