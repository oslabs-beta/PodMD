"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectReducer = selectReducer;
var _useList = require("../useList");
var _useSelect = require("./useSelect.types");
function selectReducer(state, action) {
  const {
    open
  } = state;
  const {
    context: {
      selectionMode
    }
  } = action;
  if (action.type === _useSelect.SelectActionTypes.buttonClick) {
    const itemToHighlight = state.selectedValues[0] ?? (0, _useList.moveHighlight)(null, 'start', action.context);
    return {
      ...state,
      open: !open,
      highlightedValue: !open ? itemToHighlight : null
    };
  }
  if (action.type === _useSelect.SelectActionTypes.browserAutoFill) {
    return (0, _useList.handleItemSelection)(action.item, state, action.context);
  }
  const newState = (0, _useList.listReducer)(state, action);
  switch (action.type) {
    case _useList.ListActionTypes.keyDown:
      if (state.open) {
        if (action.event.key === 'Escape') {
          return {
            ...newState,
            open: false
          };
        }
      } else {
        if (action.event.key === 'ArrowDown') {
          return {
            ...state,
            open: true,
            highlightedValue: state.selectedValues[0] ?? (0, _useList.moveHighlight)(null, 'start', action.context)
          };
        }
        if (action.event.key === 'ArrowUp') {
          return {
            ...state,
            open: true,
            highlightedValue: state.selectedValues[0] ?? (0, _useList.moveHighlight)(null, 'end', action.context)
          };
        }
      }
      break;
    case _useList.ListActionTypes.itemClick:
      if (selectionMode === 'single') {
        return {
          ...newState,
          open: false
        };
      }
      break;
    case _useList.ListActionTypes.blur:
      return {
        ...newState,
        open: false
      };
    default:
      return newState;
  }
  return newState;
}