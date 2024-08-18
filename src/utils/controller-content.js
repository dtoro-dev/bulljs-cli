import { capitalize } from "./capitalize.js";

export const getControllerContent = (moduleName) => {
  const className = capitalize(moduleName) + "Controller";
  return `import { ${capitalize(
    moduleName
  )}Service } from './${moduleName}.service';
import { Request, Response } from 'express';

export class ${className} {
  constructor(private ${moduleName}Service: ${capitalize(moduleName)}Service) {}

  async getAll(req: Request, res: Response): Promise<void> {
    const data = await this.${moduleName}Service.findAll();
    res.json(data);
  }

  async getOne(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const data = await this.${moduleName}Service.findOne(id);
    res.json(data);
  }

  async create(req: Request, res: Response): Promise<void> {
    const dto = req.body;
    const data = await this.${moduleName}Service.create(dto);
    res.status(201).json(data);
  }

  async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const dto = req.body;
    const data = await this.${moduleName}Service.update(id, dto);
    res.json(data);
  }

  async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await this.${moduleName}Service.delete(id);
    res.status(204).send();
  }
}`;
}