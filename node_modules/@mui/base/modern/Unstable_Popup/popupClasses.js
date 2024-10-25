import { generateUtilityClass } from "../generateUtilityClass/index.js";
import { generateUtilityClasses } from "../generateUtilityClasses/index.js";
const COMPONENT_NAME = 'Popup';
export function getPopupUtilityClass(slot) {
  return generateUtilityClass(COMPONENT_NAME, slot);
}
export const popupClasses = generateUtilityClasses(COMPONENT_NAME, ['root', 'open']);