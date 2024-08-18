import { capitalize } from "./capitalize.js";

export function getInterfaceContent(moduleName) {
  return `export interface ${capitalize(moduleName)} {
  id: string;
  name: string;
}`;
}