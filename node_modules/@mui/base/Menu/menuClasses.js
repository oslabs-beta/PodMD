import { generateUtilityClass } from "../generateUtilityClass/index.js";
import { generateUtilityClasses } from "../generateUtilityClasses/index.js";
const COMPONENT_NAME = 'Menu';
export function getMenuUtilityClass(slot) {
  return generateUtilityClass(COMPONENT_NAME, slot);
}
export const menuClasses = generateUtilityClasses(COMPONENT_NAME, ['root', 'listbox', 'expanded']);