import { listReducer, ListActionTypes, moveHighlight } from "../useList/index.js";
import { TabsListActionTypes } from "./useTabsList.types.js";
export function tabsListReducer(state, action) {
  if (action.type === TabsListActionTypes.valueChange) {
    return {
      ...state,
      highlightedValue: action.value
    };
  }
  const newState = listReducer(state, action);
  const {
    context: {
      selectionFollowsFocus
    }
  } = action;
  if (action.type === ListActionTypes.itemsChange) {
    if (newState.selectedValues.length > 0) {
      return {
        ...newState,
        highlightedValue: newState.selectedValues[0]
      };
    }
    moveHighlight(null, 'reset', action.context);
  }
  if (selectionFollowsFocus && newState.highlightedValue != null) {
    return {
      ...newState,
      selectedValues: [newState.highlightedValue]
    };
  }
  return newState;
}