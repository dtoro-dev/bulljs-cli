import { capitalize } from "./capitalize.js";

export function getSwaggerContent(moduleName) {
  return `/**
 * @swagger
 * tags:
 *   name: ${capitalize(moduleName)}
 *   description: API endpoints for managing ${moduleName}
 */

/**
 * @swagger
 * /${moduleName}:
 *   get:
 *     summary: Retrieve a list of ${moduleName}
 *     tags: [${capitalize(moduleName)}]
 *     responses:
 *       200:
 *         description: A list of ${moduleName}
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/${capitalize(moduleName)}'
 */

/**
 * @swagger
 * /${moduleName}/{id}:
 *   get:
 *     summary: Retrieve a single ${moduleName}
 *     tags: [${capitalize(moduleName)}]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single ${moduleName}
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/${capitalize(moduleName)}'
 */

/**
 * @swagger
 * /${moduleName}:
 *   post:
 *     summary: Create a new ${moduleName}
 *     tags: [${capitalize(moduleName)}]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Create${capitalize(moduleName)}Dto'
 *     responses:
 *       201:
 *         description: The created ${moduleName}
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/${capitalize(moduleName)}'
 */

/**
 * @swagger
 * /${moduleName}/{id}:
 *   put:
 *     summary: Update an existing ${moduleName}
 *     tags: [${capitalize(moduleName)}]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Update${capitalize(moduleName)}Dto'
 *     responses:
 *       200:
 *         description: The updated ${moduleName}
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/${capitalize(moduleName)}'
 */

/**
 * @swagger
 * /${moduleName}/{id}:
 *   delete:
 *     summary: Delete an existing ${moduleName}
 *     tags: [${capitalize(moduleName)}]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: ${capitalize(moduleName)} deleted
 */
`;
}