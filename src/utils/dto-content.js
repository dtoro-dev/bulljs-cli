import { capitalize } from "./capitalize.js";

export function getDtoContent(moduleName) {
  return `export interface Create${capitalize(moduleName)}Dto {
  // define the properties for the create DTO
  name: string;
}

export interface Update${capitalize(moduleName)}Dto {
  // define the properties for the update DTO
  name?: string;
}`;
}