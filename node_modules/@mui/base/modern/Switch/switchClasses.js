import { generateUtilityClass } from "../generateUtilityClass/index.js";
import { generateUtilityClasses } from "../generateUtilityClasses/index.js";
const COMPONENT_NAME = 'Switch';
export function getSwitchUtilityClass(slot) {
  return generateUtilityClass(COMPONENT_NAME, slot);
}
export const switchClasses = generateUtilityClasses(COMPONENT_NAME, ['root', 'input', 'track', 'thumb', 'checked', 'disabled', 'focusVisible', 'readOnly']);