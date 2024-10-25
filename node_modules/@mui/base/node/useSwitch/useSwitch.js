"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSwitch = useSwitch;
var React = _interopRequireWildcard(require("react"));
var _utils = require("@mui/utils");
/**
 * The basic building block for creating custom switches.
 *
 * Demos:
 *
 * - [Switch](https://mui.com/base-ui/react-switch/#hook)
 *
 * API:
 *
 * - [useSwitch API](https://mui.com/base-ui/react-switch/hooks-api/#use-switch)
 */
function useSwitch(props) {
  const {
    checked: checkedProp,
    defaultChecked,
    disabled,
    onBlur,
    onChange,
    onFocus,
    onFocusVisible,
    readOnly,
    required
  } = props;
  const [checked, setCheckedState] = (0, _utils.unstable_useControlled)({
    controlled: checkedProp,
    default: Boolean(defaultChecked),
    name: 'Switch',
    state: 'checked'
  });
  const createHandleInputChange = otherProps => event => {
    // Workaround for https://github.com/facebook/react/issues/9023
    if (event.nativeEvent.defaultPrevented) {
      return;
    }
    setCheckedState(event.target.checked);
    onChange?.(event);
    otherProps.onChange?.(event);
  };
  const [focusVisible, setFocusVisible] = React.useState(false);
  if (disabled && focusVisible) {
    setFocusVisible(false);
  }
  const inputRef = React.useRef(null);
  const createHandleFocus = otherProps => event => {
    // Fix for https://github.com/facebook/react/issues/7769
    if (!inputRef.current) {
      inputRef.current = event.currentTarget;
    }
    if ((0, _utils.unstable_isFocusVisible)(event.target)) {
      setFocusVisible(true);
      onFocusVisible?.(event);
    }
    onFocus?.(event);
    otherProps.onFocus?.(event);
  };
  const createHandleBlur = otherProps => event => {
    if (!(0, _utils.unstable_isFocusVisible)(event.target)) {
      setFocusVisible(false);
    }
    onBlur?.(event);
    otherProps.onBlur?.(event);
  };
  const handleInputRef = (0, _utils.unstable_useForkRef)(inputRef);
  const getInputProps = (otherProps = {}) => ({
    checked: checkedProp,
    defaultChecked,
    disabled,
    readOnly,
    ref: handleInputRef,
    required,
    type: 'checkbox',
    role: 'switch',
    'aria-checked': checkedProp,
    ...otherProps,
    onChange: createHandleInputChange(otherProps),
    onFocus: createHandleFocus(otherProps),
    onBlur: createHandleBlur(otherProps)
  });
  return {
    checked,
    disabled: Boolean(disabled),
    focusVisible,
    getInputProps,
    inputRef: handleInputRef,
    readOnly: Boolean(readOnly)
  };
}