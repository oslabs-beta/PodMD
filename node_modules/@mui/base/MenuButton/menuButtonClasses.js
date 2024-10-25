import { generateUtilityClass } from "../generateUtilityClass/index.js";
import { generateUtilityClasses } from "../generateUtilityClasses/index.js";
const COMPONENT_NAME = 'MenuButton';
export function getMenuButtonUtilityClass(slot) {
  return generateUtilityClass(COMPONENT_NAME, slot);
}
export const menuButtonClasses = generateUtilityClasses(COMPONENT_NAME, ['root', 'active', 'disabled', 'expanded']);