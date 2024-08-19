import { capitalize } from "./capitalize.js";

export function getDtoContent(moduleName) {
  return `export interface Create${capitalize(moduleName)}Dto {
  name: string;
}

export interface Update${capitalize(moduleName)}Dto {
  name?: string;
}`;
}