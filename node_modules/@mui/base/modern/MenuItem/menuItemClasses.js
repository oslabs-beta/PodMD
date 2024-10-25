import { generateUtilityClass } from "../generateUtilityClass/index.js";
import { generateUtilityClasses } from "../generateUtilityClasses/index.js";
const COMPONENT_NAME = 'MenuItem';
export function getMenuItemUtilityClass(slot) {
  return generateUtilityClass(COMPONENT_NAME, slot);
}
export const menuItemClasses = generateUtilityClasses(COMPONENT_NAME, ['root', 'disabled', 'focusVisible']);