import { generateUtilityClasses } from "../generateUtilityClasses/index.js";
import { generateUtilityClass } from "../generateUtilityClass/index.js";
const COMPONENT_NAME = 'Modal';
export function getModalUtilityClass(slot) {
  return generateUtilityClass(COMPONENT_NAME, slot);
}
export const modalClasses = generateUtilityClasses(COMPONENT_NAME, ['root', 'hidden', 'backdrop']);