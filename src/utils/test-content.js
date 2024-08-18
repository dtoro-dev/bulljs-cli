import { capitalize } from "./capitalize.js";

export function getTestContent(moduleName) {
  return `import { ${capitalize(
    moduleName
  )}Controller } from '../app/${moduleName}/${moduleName}.controller';
import { ${capitalize(
    moduleName
  )}Service } from '../app/${moduleName}/${moduleName}.service';

describe('${capitalize(moduleName)} Controller', () => {
  let controller: ${capitalize(moduleName)}Controller;

  beforeEach(() => {
    controller = new ${capitalize(moduleName)}Controller(new ${capitalize(
    moduleName
  )}Service());
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});`;
}
