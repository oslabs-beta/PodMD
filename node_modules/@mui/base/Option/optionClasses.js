import { generateUtilityClass } from "../generateUtilityClass/index.js";
import { generateUtilityClasses } from "../generateUtilityClasses/index.js";
const COMPONENT_NAME = 'Option';
export function getOptionUtilityClass(slot) {
  return generateUtilityClass(COMPONENT_NAME, slot);
}
export const optionClasses = generateUtilityClasses(COMPONENT_NAME, ['root', 'disabled', 'selected', 'highlighted']);