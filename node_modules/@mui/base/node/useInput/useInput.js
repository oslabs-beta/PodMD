"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useInput = useInput;
var _formatMuiErrorMessage2 = _interopRequireDefault(require("@mui/utils/formatMuiErrorMessage"));
var React = _interopRequireWildcard(require("react"));
var _utils = require("@mui/utils");
var _FormControl = require("../FormControl");
var _extractEventHandlers = require("../utils/extractEventHandlers");
/**
 *
 * Demos:
 *
 * - [Input](https://mui.com/base-ui/react-input/#hook)
 *
 * API:
 *
 * - [useInput API](https://mui.com/base-ui/react-input/hooks-api/#use-input)
 */
function useInput(parameters = {}) {
  const {
    defaultValue: defaultValueProp,
    disabled: disabledProp = false,
    error: errorProp = false,
    onBlur,
    onChange,
    onFocus,
    required: requiredProp = false,
    value: valueProp,
    inputRef: inputRefProp
  } = parameters;
  const formControlContext = (0, _FormControl.useFormControlContext)();
  let defaultValue;
  let disabled;
  let error;
  let required;
  let value;
  if (formControlContext) {
    defaultValue = undefined;
    disabled = formControlContext.disabled ?? false;
    error = formControlContext.error ?? false;
    required = formControlContext.required ?? false;
    value = formControlContext.value;
    if (process.env.NODE_ENV !== 'production') {
      const definedLocalProps = ['defaultValue', 'disabled', 'error', 'required', 'value'].filter(prop => parameters[prop] !== undefined);
      if (definedLocalProps.length > 0) {
        console.warn(['MUI: You have set props on an input that is inside a FormControl.', 'Set these props on a FormControl instead. Otherwise they will be ignored.', `Ignored props: ${definedLocalProps.join(', ')}`].join('\n'));
      }
    }
  } else {
    defaultValue = defaultValueProp;
    disabled = disabledProp;
    error = errorProp;
    required = requiredProp;
    value = valueProp;
  }
  const {
    current: isControlled
  } = React.useRef(value != null);
  const handleInputRefWarning = React.useCallback(instance => {
    if (process.env.NODE_ENV !== 'production') {
      if (instance && instance.nodeName !== 'INPUT' && !instance.focus) {
        console.error(['MUI: You have provided a `slots.input` to the input component', 'that does not correctly handle the `ref` prop.', 'Make sure the `ref` prop is called with a HTMLInputElement.'].join('\n'));
      }
    }
  }, []);
  const inputRef = React.useRef(null);
  const handleInputRef = (0, _utils.unstable_useForkRef)(inputRef, inputRefProp, handleInputRefWarning);
  const [focused, setFocused] = React.useState(false);

  // The blur won't fire when the disabled state is set on a focused input.
  // We need to book keep the focused state manually.
  React.useEffect(() => {
    if (!formControlContext && disabled && focused) {
      setFocused(false);

      // @ts-ignore
      onBlur?.();
    }
  }, [formControlContext, disabled, focused, onBlur]);
  const handleFocus = otherHandlers => event => {
    // Fix a bug with IE11 where the focus/blur events are triggered
    // while the component is disabled.
    if (formControlContext?.disabled) {
      event.stopPropagation();
      return;
    }
    otherHandlers.onFocus?.(event);
    if (formControlContext && formControlContext.onFocus) {
      formControlContext?.onFocus?.();
    } else {
      setFocused(true);
    }
  };
  const handleBlur = otherHandlers => event => {
    otherHandlers.onBlur?.(event);
    if (formControlContext && formControlContext.onBlur) {
      formControlContext.onBlur();
    } else {
      setFocused(false);
    }
  };
  const handleChange = otherHandlers => (event, ...args) => {
    if (!isControlled) {
      const element = event.target || inputRef.current;
      if (element == null) {
        throw new Error(process.env.NODE_ENV !== "production" ? 'MUI: Expected valid input target. ' + 'Did you use a custom `slots.input` and forget to forward refs? ' + 'See https://mui.com/r/input-component-ref-interface for more info.' : (0, _formatMuiErrorMessage2.default)(17));
      }
    }
    formControlContext?.onChange?.(event);

    // @ts-ignore
    otherHandlers.onChange?.(event, ...args);
  };
  const handleClick = otherHandlers => event => {
    if (inputRef.current && event.currentTarget === event.target) {
      inputRef.current.focus();
    }
    otherHandlers.onClick?.(event);
  };
  const getRootProps = (externalProps = {}) => {
    // onBlur, onChange and onFocus are forwarded to the input slot.
    const propsEventHandlers = (0, _extractEventHandlers.extractEventHandlers)(parameters, ['onBlur', 'onChange', 'onFocus']);
    const externalEventHandlers = {
      ...propsEventHandlers,
      ...(0, _extractEventHandlers.extractEventHandlers)(externalProps)
    };
    return {
      ...externalProps,
      ...externalEventHandlers,
      onClick: handleClick(externalEventHandlers)
    };
  };
  const getInputProps = (externalProps = {}) => {
    const propsEventHandlers = {
      onBlur,
      onChange,
      onFocus
    };
    const externalEventHandlers = {
      ...propsEventHandlers,
      ...(0, _extractEventHandlers.extractEventHandlers)(externalProps)
    };
    const mergedEventHandlers = {
      ...externalEventHandlers,
      onBlur: handleBlur(externalEventHandlers),
      onChange: handleChange(externalEventHandlers),
      onFocus: handleFocus(externalEventHandlers)
    };
    return {
      ...mergedEventHandlers,
      'aria-invalid': error || undefined,
      defaultValue: defaultValue,
      value: value,
      required,
      disabled,
      ...externalProps,
      ref: handleInputRef,
      ...mergedEventHandlers
    };
  };
  return {
    disabled,
    error,
    focused,
    formControlContext,
    getInputProps,
    getRootProps,
    inputRef: handleInputRef,
    required,
    value
  };
}