import { capitalize } from "./capitalize.js";

export function getSwaggerContent(moduleName) {
  return `
import { getDtoSchema } from "@decorators/doc-property";
import {
  Create${capitalize(moduleName)}Dto,
  Update${capitalize(moduleName)}Dto,
} from "./${moduleName}.dto";

export const swaggerDocument = {
  tags: [
    {
      name: '${capitalize(moduleName)}',
      description: 'API endpoints for managing ${capitalize(moduleName)}',
    },
  ],
  components: {
    schemas: {
      ${capitalize(moduleName)}: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'The unique identifier of the ${moduleName}.',
          },
          name: {
            type: 'string',
            description: 'The name of the ${moduleName}.',
          },
        },
      },
      Create${capitalize(moduleName)}Dto: getDtoSchema(Create${capitalize(moduleName)}Dto),
      Update${capitalize(moduleName)}Dto: getDtoSchema(Update${capitalize(moduleName)}Dto),
    },
  },
  paths: {
    '/${moduleName}': {
      get: {
        summary: 'Retrieve a list of ${capitalize(moduleName)}s',
        tags: ['${capitalize(moduleName)}'],
        responses: {
          200: {
            description: 'A list of ${capitalize(moduleName)}s',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/${capitalize(moduleName)}',
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: 'Create a new ${capitalize(moduleName)}',
        tags: ['${capitalize(moduleName)}'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Create${capitalize(moduleName)}Dto',
              },
            },
          },
        },
        responses: {
          201: {
            description: 'The created ${capitalize(moduleName)}',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/${capitalize(moduleName)}',
                },
              },
            },
          },
        },
      },
    },
    '/${moduleName}/{id}': {
      get: {
        summary: 'Retrieve a single ${capitalize(moduleName)}',
        tags: ['${capitalize(moduleName)}'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          200: {
            description: 'A single ${capitalize(moduleName)}',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/${capitalize(moduleName)}',
                },
              },
            },
          },
        },
      },
      put: {
        summary: 'Update an existing ${capitalize(moduleName)}',
        tags: ['${capitalize(moduleName)}'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Update${capitalize(moduleName)}Dto',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'The updated ${capitalize(moduleName)}',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/${capitalize(moduleName)}',
                },
              },
            },
          },
        },
      },
      delete: {
        summary: 'Delete an existing ${capitalize(moduleName)}',
        tags: ['${capitalize(moduleName)}'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          204: {
            description: '${capitalize(moduleName)} deleted',
          },
        },
      },
    },
  },
};

export default swaggerDocument;
`;
}
