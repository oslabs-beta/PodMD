"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = void 0;
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _composeClasses = require("../composeClasses");
var _buttonClasses = require("./buttonClasses");
var _useButton = require("../useButton");
var _utils = require("../utils");
var _ClassNameConfigurator = require("../utils/ClassNameConfigurator");
var _jsxRuntime = require("react/jsx-runtime");
const useUtilityClasses = ownerState => {
  const {
    active,
    disabled,
    focusVisible
  } = ownerState;
  const slots = {
    root: ['root', disabled && 'disabled', focusVisible && 'focusVisible', active && 'active']
  };
  return (0, _composeClasses.unstable_composeClasses)(slots, (0, _ClassNameConfigurator.useClassNamesOverride)(_buttonClasses.getButtonUtilityClass));
};
/**
 * The foundation for building custom-styled buttons.
 *
 * Demos:
 *
 * - [Button](https://mui.com/base-ui/react-button/)
 *
 * API:
 *
 * - [Button API](https://mui.com/base-ui/react-button/components-api/#button)
 */
const Button = exports.Button = /*#__PURE__*/React.forwardRef(function Button(props, forwardedRef) {
  const {
    action,
    children,
    disabled,
    focusableWhenDisabled = false,
    onFocusVisible,
    slotProps = {},
    slots = {},
    rootElementName: rootElementNameProp = 'button',
    ...other
  } = props;
  const buttonRef = React.useRef(null);
  let rootElementName = rootElementNameProp;
  if (typeof slots.root === 'string') {
    rootElementName = slots.root;
  } else if (other.href || other.to) {
    rootElementName = 'a';
  }
  const {
    active,
    focusVisible,
    setFocusVisible,
    getRootProps
  } = (0, _useButton.useButton)({
    ...props,
    focusableWhenDisabled,
    rootElementName
  });
  React.useImperativeHandle(action, () => ({
    focusVisible: () => {
      setFocusVisible(true);
      buttonRef.current.focus();
    }
  }), [setFocusVisible]);
  const ownerState = {
    ...props,
    active,
    focusableWhenDisabled,
    focusVisible
  };
  const classes = useUtilityClasses(ownerState);
  const defaultElement = other.href || other.to ? 'a' : 'button';
  const Root = slots.root ?? defaultElement;
  const rootProps = (0, _utils.useSlotProps)({
    elementType: Root,
    getSlotProps: getRootProps,
    externalForwardedProps: other,
    externalSlotProps: slotProps.root,
    additionalProps: {
      ref: forwardedRef
    },
    ownerState,
    className: classes.root
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(Root, {
    ...rootProps,
    children: children
  });
});
process.env.NODE_ENV !== "production" ? Button.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref for imperative actions. It currently only supports `focusVisible()` action.
   */
  action: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.shape({
    current: _propTypes.default.shape({
      focusVisible: _propTypes.default.func.isRequired
    })
  })]),
  /**
   * @ignore
   */
  children: _propTypes.default.node,
  /**
   * @ignore
   */
  className: _propTypes.default.string,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: _propTypes.default.bool,
  /**
   * If `true`, allows a disabled button to receive focus.
   * @default false
   */
  focusableWhenDisabled: _propTypes.default.bool,
  /**
   * @ignore
   */
  href: _propTypes.default.string,
  /**
   * @ignore
   */
  onFocusVisible: _propTypes.default.func,
  /**
   * The HTML element that is ultimately rendered, for example 'button' or 'a'
   * @default 'button'
   */
  rootElementName: _propTypes.default /* @typescript-to-proptypes-ignore */.string,
  /**
   * The props used for each slot inside the Button.
   * @default {}
   */
  slotProps: _propTypes.default.shape({
    root: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object])
  }),
  /**
   * The components used for each slot inside the Button.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: _propTypes.default.shape({
    root: _propTypes.default.elementType
  }),
  /**
   * @ignore
   */
  to: _propTypes.default.string
} : void 0;