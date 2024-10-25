"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useMenuButton = useMenuButton;
var React = _interopRequireWildcard(require("react"));
var _utils = require("@mui/utils");
var _DropdownContext = require("../useDropdown/DropdownContext");
var _useDropdown = require("../useDropdown/useDropdown.types");
var _useButton = require("../useButton/useButton");
var _combineHooksSlotProps = require("../utils/combineHooksSlotProps");
var _utils2 = require("../utils");
/**
 *
 * Demos:
 *
 * - [Menu](https://mui.com/base-ui/react-menu/#hooks)
 *
 * API:
 *
 * - [useMenuButton API](https://mui.com/base-ui/react-menu/hooks-api/#use-menu-button)
 */
function useMenuButton(parameters = {}) {
  const {
    disabled = false,
    focusableWhenDisabled,
    rootRef: externalRef
  } = parameters;
  const menuContext = React.useContext(_DropdownContext.DropdownContext);
  if (menuContext === null) {
    throw new Error('useMenuButton: no menu context available.');
  }
  const {
    state,
    dispatch,
    registerTrigger,
    popupId
  } = menuContext;
  const {
    getRootProps: getButtonRootProps,
    rootRef: buttonRootRef,
    active
  } = (0, _useButton.useButton)({
    disabled,
    focusableWhenDisabled,
    rootRef: externalRef
  });
  const handleRef = (0, _utils.unstable_useForkRef)(buttonRootRef, registerTrigger);
  const createHandleClick = otherHandlers => event => {
    otherHandlers.onClick?.(event);
    if (event.defaultMuiPrevented) {
      return;
    }
    dispatch({
      type: _useDropdown.DropdownActionTypes.toggle,
      event
    });
  };
  const createHandleKeyDown = otherHandlers => event => {
    otherHandlers.onKeyDown?.(event);
    if (event.defaultMuiPrevented) {
      return;
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      dispatch({
        type: _useDropdown.DropdownActionTypes.open,
        event
      });
    }
  };
  const getOwnRootProps = (otherHandlers = {}) => ({
    onClick: createHandleClick(otherHandlers),
    onKeyDown: createHandleKeyDown(otherHandlers)
  });
  const getRootProps = (externalProps = {}) => {
    const externalEventHandlers = (0, _utils2.extractEventHandlers)(externalProps);
    const getCombinedProps = (0, _combineHooksSlotProps.combineHooksSlotProps)(getOwnRootProps, getButtonRootProps);
    return {
      'aria-haspopup': 'menu',
      'aria-expanded': state.open,
      'aria-controls': popupId,
      ...externalProps,
      ...externalEventHandlers,
      ...getCombinedProps(externalEventHandlers),
      tabIndex: 0,
      // this is needed to make the button focused after click in Safari
      ref: handleRef
    };
  };
  return {
    active,
    getRootProps,
    open: state.open,
    rootRef: handleRef
  };
}