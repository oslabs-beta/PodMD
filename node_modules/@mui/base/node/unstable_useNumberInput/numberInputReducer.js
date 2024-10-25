"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.numberInputReducer = numberInputReducer;
var _numberInputAction = require("./numberInputAction.types");
var _utils = require("./utils");
function getClampedValues(rawValue, context) {
  const {
    min,
    max,
    step
  } = context;
  const clampedValue = rawValue === null ? null : (0, _utils.clampStepwise)(rawValue, min, max, step);
  const newInputValue = clampedValue === null ? '' : String(clampedValue);
  return {
    value: clampedValue,
    inputValue: newInputValue
  };
}
function stepValue(state, context, direction, multiplier) {
  const {
    value
  } = state;
  const {
    step = 1,
    min,
    max
  } = context;
  if ((0, _utils.isNumber)(value)) {
    return {
      up: value + (step ?? 1) * multiplier,
      down: value - (step ?? 1) * multiplier
    }[direction];
  }
  return {
    up: min ?? 1,
    down: max ?? -1
  }[direction];
}
function handleClamp(state, context, inputValue) {
  const {
    getInputValueAsString
  } = context;
  const numberValueAsString = getInputValueAsString(inputValue);
  const intermediateValue = numberValueAsString === '' || numberValueAsString === '-' ? null : parseInt(numberValueAsString, 10);
  const clampedValues = getClampedValues(intermediateValue, context);
  return {
    ...state,
    ...clampedValues
  };
}
function handleInputChange(state, context, inputValue) {
  const {
    getInputValueAsString
  } = context;
  const numberValueAsString = getInputValueAsString(inputValue);
  if (numberValueAsString.match(/^-?\d+?$/) || numberValueAsString === '' || numberValueAsString === '-') {
    return {
      ...state,
      inputValue: numberValueAsString
    };
  }
  return state;
}

// use this for ArrowUp, ArrowDown, button clicks
// use this with applyMultiplier: true for PageUp, PageDown, button shift-clicks
function handleStep(state, context, applyMultiplier, direction) {
  const multiplier = applyMultiplier ? context.shiftMultiplier : 1;
  const newValue = stepValue(state, context, direction, multiplier);
  const clampedValues = getClampedValues(newValue, context);
  return {
    ...state,
    ...clampedValues
  };
}
function handleToMinOrMax(state, context, to) {
  const newValue = context[to];
  if (!(0, _utils.isNumber)(newValue)) {
    return state;
  }
  return {
    ...state,
    value: newValue,
    inputValue: String(newValue)
  };
}
function numberInputReducer(state, action) {
  const {
    type,
    context
  } = action;
  switch (type) {
    case _numberInputAction.NumberInputActionTypes.clamp:
      return handleClamp(state, context, action.inputValue);
    case _numberInputAction.NumberInputActionTypes.inputChange:
      return handleInputChange(state, context, action.inputValue);
    case _numberInputAction.NumberInputActionTypes.increment:
      return handleStep(state, context, action.applyMultiplier, 'up');
    case _numberInputAction.NumberInputActionTypes.decrement:
      return handleStep(state, context, action.applyMultiplier, 'down');
    case _numberInputAction.NumberInputActionTypes.incrementToMax:
      return handleToMinOrMax(state, context, 'max');
    case _numberInputAction.NumberInputActionTypes.decrementToMin:
      return handleToMinOrMax(state, context, 'min');
    case _numberInputAction.NumberInputActionTypes.resetInputValue:
      return {
        ...state,
        inputValue: String(state.value)
      };
    default:
      return state;
  }
}