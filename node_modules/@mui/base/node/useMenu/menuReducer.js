"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.menuReducer = menuReducer;
var _useList = require("../useList");
function menuReducer(state, action) {
  if (action.type === _useList.ListActionTypes.itemHover) {
    return {
      ...state,
      highlightedValue: action.item
    };
  }
  const newState = (0, _useList.listReducer)(state, action);

  // make sure an item is always highlighted
  if (newState.highlightedValue === null && action.context.items.length > 0) {
    return {
      ...newState,
      highlightedValue: action.context.items[0]
    };
  }
  if (action.type === _useList.ListActionTypes.keyDown) {
    if (action.event.key === 'Escape') {
      return {
        ...newState,
        open: false
      };
    }
  }
  if (action.type === _useList.ListActionTypes.blur) {
    if (!action.context.listboxRef.current?.contains(action.event.relatedTarget)) {
      // To prevent the menu from closing when the focus leaves the menu to the button.
      // For more details, see https://github.com/mui/material-ui/pull/36917#issuecomment-1566992698
      const listboxId = action.context.listboxRef.current?.getAttribute('id');
      const controlledBy = action.event.relatedTarget?.getAttribute('aria-controls');
      if (listboxId && controlledBy && listboxId === controlledBy) {
        return newState;
      }
      return {
        ...newState,
        open: false,
        highlightedValue: action.context.items[0]
      };
    }
  }
  return newState;
}