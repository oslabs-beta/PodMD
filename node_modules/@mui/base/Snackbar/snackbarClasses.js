import { generateUtilityClass } from "../generateUtilityClass/index.js";
import { generateUtilityClasses } from "../generateUtilityClasses/index.js";
const COMPONENT_NAME = 'Snackbar';
export function getSnackbarUtilityClass(slot) {
  return generateUtilityClass(COMPONENT_NAME, slot);
}
export const snackbarClasses = generateUtilityClasses(COMPONENT_NAME, ['root']);