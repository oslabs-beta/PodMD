"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuButton = void 0;
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _utils = require("../utils");
var _useMenuButton = require("../useMenuButton");
var _composeClasses = require("../composeClasses");
var _ClassNameConfigurator = require("../utils/ClassNameConfigurator");
var _menuButtonClasses = require("./menuButtonClasses");
var _jsxRuntime = require("react/jsx-runtime");
const useUtilityClasses = ownerState => {
  const {
    active,
    disabled,
    open
  } = ownerState;
  const slots = {
    root: ['root', disabled && 'disabled', active && 'active', open && 'expanded']
  };
  return (0, _composeClasses.unstable_composeClasses)(slots, (0, _ClassNameConfigurator.useClassNamesOverride)(_menuButtonClasses.getMenuButtonUtilityClass));
};

/**
 *
 * Demos:
 *
 * - [Menu](https://mui.com/base-ui/react-menu/)
 *
 * API:
 *
 * - [MenuButton API](https://mui.com/base-ui/react-menu/components-api/#menu-button)
 */
const MenuButton = exports.MenuButton = /*#__PURE__*/React.forwardRef(function MenuButton(props, forwardedRef) {
  const {
    children,
    disabled = false,
    label,
    slots = {},
    slotProps = {},
    focusableWhenDisabled = false,
    ...other
  } = props;
  const {
    getRootProps,
    open,
    active
  } = (0, _useMenuButton.useMenuButton)({
    disabled,
    focusableWhenDisabled,
    rootRef: forwardedRef
  });
  const ownerState = {
    ...props,
    open,
    active,
    disabled,
    focusableWhenDisabled
  };
  const classes = useUtilityClasses(ownerState);
  const Root = slots.root || 'button';
  const rootProps = (0, _utils.useSlotProps)({
    elementType: Root,
    getSlotProps: getRootProps,
    externalForwardedProps: other,
    externalSlotProps: slotProps.root,
    additionalProps: {
      ref: forwardedRef,
      type: 'button'
    },
    ownerState,
    className: classes.root
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(Root, {
    ...rootProps,
    children: children
  });
});
process.env.NODE_ENV !== "production" ? MenuButton.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: _propTypes.default.node,
  /**
   * Class name applied to the root element.
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
   * Label of the button
   */
  label: _propTypes.default.string,
  /**
   * The components used for each slot inside the MenuButton.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slotProps: _propTypes.default.shape({
    root: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object])
  }),
  /**
   * The props used for each slot inside the MenuButton.
   * @default {}
   */
  slots: _propTypes.default.shape({
    root: _propTypes.default.elementType
  })
} : void 0;