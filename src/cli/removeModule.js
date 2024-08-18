import fs from 'fs';
import path from 'path';

export function removeModule(moduleName) {
  const moduleDirPath = path.join(process.cwd(), 'src', 'app', moduleName);
  const testsDirPath = path.join(process.cwd(), 'src', 'tests', moduleName);

  if (fs.existsSync(moduleDirPath)) {
    fs.rmSync(moduleDirPath, { recursive: true, force: true });
    console.log(`Module ${moduleName} removed from ${moduleDirPath}.`);
  } else {
    console.log(`Module ${moduleName} not found in ${moduleDirPath}.`);
  }

  if (fs.existsSync(testsDirPath)) {
    fs.rmSync(testsDirPath, { recursive: true, force: true });
    console.log(`Tests for module ${moduleName} removed from ${testsDirPath}.`);
  } else {
    console.log(`Tests for module ${moduleName} not found in ${testsDirPath}.`);
  }
}
