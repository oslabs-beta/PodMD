"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tab = void 0;
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _utils = require("@mui/utils");
var _composeClasses = require("../composeClasses");
var _tabClasses = require("./tabClasses");
var _useTab = require("../useTab");
var _utils2 = require("../utils");
var _ClassNameConfigurator = require("../utils/ClassNameConfigurator");
var _jsxRuntime = require("react/jsx-runtime");
const useUtilityClasses = ownerState => {
  const {
    selected,
    disabled
  } = ownerState;
  const slots = {
    root: ['root', selected && 'selected', disabled && 'disabled']
  };
  return (0, _composeClasses.unstable_composeClasses)(slots, (0, _ClassNameConfigurator.useClassNamesOverride)(_tabClasses.getTabUtilityClass));
};
/**
 *
 * Demos:
 *
 * - [Tabs](https://mui.com/base-ui/react-tabs/)
 *
 * API:
 *
 * - [Tab API](https://mui.com/base-ui/react-tabs/components-api/#tab)
 */
const Tab = exports.Tab = /*#__PURE__*/React.forwardRef(function Tab(props, forwardedRef) {
  const {
    action,
    children,
    disabled = false,
    onChange,
    onClick,
    onFocus,
    slotProps = {},
    slots = {},
    value,
    ...other
  } = props;
  const tabRef = React.useRef(null);
  const handleRef = (0, _utils.unstable_useForkRef)(tabRef, forwardedRef);
  const {
    active,
    highlighted,
    selected,
    getRootProps
  } = (0, _useTab.useTab)({
    ...props,
    rootRef: handleRef,
    value
  });
  const ownerState = {
    ...props,
    active,
    disabled,
    highlighted,
    selected
  };
  const classes = useUtilityClasses(ownerState);
  const TabRoot = slots.root ?? 'button';
  const tabRootProps = (0, _utils2.useSlotProps)({
    elementType: TabRoot,
    getSlotProps: getRootProps,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: forwardedRef
    },
    ownerState,
    className: classes.root
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(TabRoot, {
    ...tabRootProps,
    children: children
  });
});
process.env.NODE_ENV !== "production" ? Tab.propTypes /* remove-proptypes */ = {
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
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: _propTypes.default.bool,
  /**
   * Callback invoked when new value is being set.
   */
  onChange: _propTypes.default.func,
  /**
   * The props used for each slot inside the Tab.
   * @default {}
   */
  slotProps: _propTypes.default.shape({
    root: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object])
  }),
  /**
   * The components used for each slot inside the Tab.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: _propTypes.default.shape({
    root: _propTypes.default.elementType
  }),
  /**
   * You can provide your own value. Otherwise, it falls back to the child position index.
   */
  value: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])
} : void 0;