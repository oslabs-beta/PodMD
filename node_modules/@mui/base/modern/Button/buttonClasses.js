import { generateUtilityClass } from "../generateUtilityClass/index.js";
import { generateUtilityClasses } from "../generateUtilityClasses/index.js";
const COMPONENT_NAME = 'Button';
export function getButtonUtilityClass(slot) {
  return generateUtilityClass(COMPONENT_NAME, slot);
}
export const buttonClasses = generateUtilityClasses(COMPONENT_NAME, ['root', 'active', 'disabled', 'focusVisible']);