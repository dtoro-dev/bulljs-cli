import { generateModule } from './generateModule.js';
import { removeModule } from './removeModule.js';

const command = process.argv[2];
const moduleName = process.argv[3];

if (!moduleName) {
  console.error('Please provide the module name.');
  process.exit(1);
}

if (command === 'generate:module') {
  generateModule(moduleName);
} else if (command === 'remove:module') {
  removeModule(moduleName);
} else {
  console.log('Unknown command.');
}
