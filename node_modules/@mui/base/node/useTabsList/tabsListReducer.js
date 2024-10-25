"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tabsListReducer = tabsListReducer;
var _useList = require("../useList");
var _useTabsList = require("./useTabsList.types");
function tabsListReducer(state, action) {
  if (action.type === _useTabsList.TabsListActionTypes.valueChange) {
    return {
      ...state,
      highlightedValue: action.value
    };
  }
  const newState = (0, _useList.listReducer)(state, action);
  const {
    context: {
      selectionFollowsFocus
    }
  } = action;
  if (action.type === _useList.ListActionTypes.itemsChange) {
    if (newState.selectedValues.length > 0) {
      return {
        ...newState,
        highlightedValue: newState.selectedValues[0]
      };
    }
    (0, _useList.moveHighlight)(null, 'reset', action.context);
  }
  if (selectionFollowsFocus && newState.highlightedValue != null) {
    return {
      ...newState,
      selectedValues: [newState.highlightedValue]
    };
  }
  return newState;
}