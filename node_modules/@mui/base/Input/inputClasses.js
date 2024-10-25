import { generateUtilityClass } from "../generateUtilityClass/index.js";
import { generateUtilityClasses } from "../generateUtilityClasses/index.js";
const COMPONENT_NAME = 'Input';
export function getInputUtilityClass(slot) {
  return generateUtilityClass(COMPONENT_NAME, slot);
}
export const inputClasses = generateUtilityClasses(COMPONENT_NAME, ['root', 'formControl', 'focused', 'disabled', 'error', 'multiline', 'input', 'inputMultiline', 'inputTypeSearch', 'adornedStart', 'adornedEnd']);