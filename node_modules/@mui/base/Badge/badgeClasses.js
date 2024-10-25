import { generateUtilityClasses } from "../generateUtilityClasses/index.js";
import { generateUtilityClass } from "../generateUtilityClass/index.js";
const COMPONENT_NAME = 'Badge';
export function getBadgeUtilityClass(slot) {
  return generateUtilityClass(COMPONENT_NAME, slot);
}
export const badgeClasses = generateUtilityClasses(COMPONENT_NAME, ['root', 'badge', 'invisible']);