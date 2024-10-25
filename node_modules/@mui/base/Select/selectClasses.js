import { generateUtilityClass } from "../generateUtilityClass/index.js";
import { generateUtilityClasses } from "../generateUtilityClasses/index.js";
const COMPONENT_NAME = 'Select';
export function getSelectUtilityClass(slot) {
  return generateUtilityClass(COMPONENT_NAME, slot);
}
export const selectClasses = generateUtilityClasses(COMPONENT_NAME, ['root', 'button', 'listbox', 'popup', 'active', 'expanded', 'disabled', 'focusVisible']);