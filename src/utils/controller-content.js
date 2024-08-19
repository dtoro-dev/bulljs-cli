import { capitalize } from "./capitalize.js";

export const getControllerContent = (moduleName) => {
  const className = capitalize(moduleName) + "Controller";
  const serviceName = capitalize(moduleName) + "Service";
  return `import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from "@decorators/index";
import { Inject } from "@decorators/injectable";
import { ${capitalize(
    moduleName
  )}Service } from './${moduleName}.service';
import { Create${capitalize(
    moduleName
  )}Dto, Update${capitalize(
    moduleName
  )}Dto } from './${moduleName}.dto';
import { Req, Res, ResType, ReqType } from "@decorators/params";

@Controller('/${moduleName}')
class ${className} {
  @Inject(${serviceName})
  private ${serviceName}!: ${capitalize(serviceName)};
  
  constructor() {}
  
  @Get("/")
  async getAll(@Req() req: ReqType, @Res() res: ResType): Promise<void> {
    const data = await this.${serviceName}.findAll();
    res.json(data);
  }

  @Get("/:id")
  async getOne(@Param("id") id: string, @Res() res: ResType): Promise<void> {
    const data = await this.${serviceName}.findOne(id);
    res.json(data);
  }

  @Post("/")
  async create(
    @Body() dto: Create${capitalize(moduleName)}Dto,
    @Res() res: ResType
  ): Promise<void> {
    const data = await this.${serviceName}.create(dto);
    res.status(201).json(data);
  }

  @Put("/:id")
  async update(
    @Param("id") id: string,
    @Body() dto: Update${capitalize(moduleName)}Dto,
    @Res() res: ResType
  ): Promise<void> {
    const data = await this.${serviceName}.update(id, dto);
    res.json(data);
  }

  @Delete("/:id")
  async delete(@Param("id") id: string, @Res() res: ResType): Promise<void> {
    await this.${serviceName}.delete(id);
    res.status(204).send();
  }
}
  
export default ${className};
`;
}