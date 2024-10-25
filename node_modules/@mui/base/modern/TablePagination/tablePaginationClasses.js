import { generateUtilityClass } from "../generateUtilityClass/index.js";
import { generateUtilityClasses } from "../generateUtilityClasses/index.js";
const COMPONENT_NAME = 'TablePagination';
export function getTablePaginationUtilityClass(slot) {
  return generateUtilityClass(COMPONENT_NAME, slot);
}
export const tablePaginationClasses = generateUtilityClasses(COMPONENT_NAME, ['root', 'toolbar', 'spacer', 'selectLabel', 'selectRoot', 'select', 'selectIcon', 'input', 'menuItem', 'displayedRows', 'actions']);