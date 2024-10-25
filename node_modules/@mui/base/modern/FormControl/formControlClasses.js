import { generateUtilityClass } from "../generateUtilityClass/index.js";
import { generateUtilityClasses } from "../generateUtilityClasses/index.js";
const COMPONENT_NAME = 'FormControl';
export function getFormControlUtilityClass(slot) {
  return generateUtilityClass(COMPONENT_NAME, slot);
}
export const formControlClasses = generateUtilityClasses(COMPONENT_NAME, ['root', 'disabled', 'error', 'filled', 'focused', 'required']);