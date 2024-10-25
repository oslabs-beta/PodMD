import { generateUtilityClass } from "../generateUtilityClass/index.js";
import { generateUtilityClasses } from "../generateUtilityClasses/index.js";
const COMPONENT_NAME = 'OptionGroup';
export function getOptionGroupUtilityClass(slot) {
  return generateUtilityClass(COMPONENT_NAME, slot);
}
export const optionGroupClasses = generateUtilityClasses(COMPONENT_NAME, ['root', 'disabled', 'label', 'list']);