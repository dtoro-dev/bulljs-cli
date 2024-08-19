import { capitalize } from "./capitalize.js";

export function getRoutesContent(moduleName) {
  return `import { Router } from 'express';
import ${capitalize(
    moduleName
  )}Controller from './${moduleName}.controller';
import { resolveDependencies } from '@core/container';

const router = Router();
const controller = resolveDependencies(${capitalize(moduleName)}Controller);

router.get('/', controller.getAll);
router.get('/:id', (req, res) => controller.getOne(req.params.id, res));
router.post('/', (req, res) => controller.create(req.body, res));
router.put('/:id', (req, res) => controller.update(req.params.id, req.body, res));
router.delete('/:id', (req, res) => controller.delete(req.params.id, res));

export default router;`;
}