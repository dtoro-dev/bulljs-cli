import { capitalize } from "./capitalize.js";

export function getTestContent(moduleName) {
  return `import { ${capitalize(
    moduleName
  )}Controller } from '../app/${moduleName}/${moduleName}.controller';

describe('${capitalize(moduleName)} Controller', () => {
  let controller: ${capitalize(moduleName)}Controller;

  beforeEach(() => {
    controller = new ${capitalize(moduleName)}Controller();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});`;
}
