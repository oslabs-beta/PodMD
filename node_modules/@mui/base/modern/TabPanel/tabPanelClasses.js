import { generateUtilityClass } from "../generateUtilityClass/index.js";
import { generateUtilityClasses } from "../generateUtilityClasses/index.js";
const COMPONENT_NAME = 'TabPanel';
export function getTabPanelUtilityClass(slot) {
  return generateUtilityClass(COMPONENT_NAME, slot);
}
export const tabPanelClasses = generateUtilityClasses(COMPONENT_NAME, ['root', 'hidden']);