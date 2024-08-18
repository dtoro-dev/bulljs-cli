import { capitalize } from "./capitalize.js";

export function getRoutesContent(moduleName) {
  return `import { Router } from 'express';
import { ${capitalize(
    moduleName
  )}Controller } from './${moduleName}.controller';
import { ${capitalize(moduleName)}Service } from './${moduleName}.service';

const router = Router();
const controller = new ${capitalize(moduleName)}Controller(new ${capitalize(
    moduleName
  )}Service());

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getOne.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;`;
}