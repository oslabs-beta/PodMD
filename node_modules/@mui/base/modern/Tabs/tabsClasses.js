import { generateUtilityClass } from "../generateUtilityClass/index.js";
import { generateUtilityClasses } from "../generateUtilityClasses/index.js";
const COMPONENT_NAME = 'Tabs';
export function getTabsUtilityClass(slot) {
  return generateUtilityClass(COMPONENT_NAME, slot);
}
export const tabsClasses = generateUtilityClasses(COMPONENT_NAME, ['root', 'horizontal', 'vertical']);