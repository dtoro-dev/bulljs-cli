import { capitalize } from "./capitalize.js";

export function getServiceContent(moduleName) {
  return `import { Injectable } from '@decorators/injectable';
import { ${capitalize(moduleName)} } from './${moduleName}.interface';

@Injectable()
export class ${capitalize(moduleName)}Service {
  private data: ${capitalize(moduleName)}[] = [
    { id: '1', name: 'Example ${capitalize(moduleName)} 1' },
    { id: '2', name: 'Example ${capitalize(moduleName)} 2' },
    { id: '3', name: 'Example ${capitalize(moduleName)} 3' }
  ];

  async findAll(): Promise<${capitalize(moduleName)}[]> {
    return this.data;
  }

  async findOne(id: string): Promise<${capitalize(moduleName)} | undefined> {
    return this.data.find(item => item.id === id);
  }

  async create(dto: any): Promise<${capitalize(moduleName)}> {
    const newItem = { id: Math.random().toString(), ...dto };
    this.data.push(newItem);
    return newItem;
  }

  async update(id: string, dto: any): Promise<${capitalize(
    moduleName
  )} | undefined> {
    const index = this.data.findIndex(item => item.id === id);
    if (index !== -1) {
      this.data[index] = { ...this.data[index], ...dto };
      return this.data[index];
    }
    return undefined;
  }

  async delete(id: string): Promise<void> {
    this.data = this.data.filter(item => item.id !== id);
  }
}`;
}
