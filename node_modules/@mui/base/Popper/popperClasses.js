import { generateUtilityClass } from "../generateUtilityClass/index.js";
import { generateUtilityClasses } from "../generateUtilityClasses/index.js";
const COMPONENT_NAME = 'Popper';
export function getPopperUtilityClass(slot) {
  return generateUtilityClass(COMPONENT_NAME, slot);
}
export const popperClasses = generateUtilityClasses(COMPONENT_NAME, ['root']);