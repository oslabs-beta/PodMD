"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabsList = void 0;
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _composeClasses = require("../composeClasses");
var _utils = require("../utils");
var _tabsListClasses = require("./tabsListClasses");
var _useTabsList = require("../useTabsList");
var _ClassNameConfigurator = require("../utils/ClassNameConfigurator");
var _TabsListProvider = require("../useTabsList/TabsListProvider");
var _jsxRuntime = require("react/jsx-runtime");
const useUtilityClasses = ownerState => {
  const {
    orientation
  } = ownerState;
  const slots = {
    root: ['root', orientation]
  };
  return (0, _composeClasses.unstable_composeClasses)(slots, (0, _ClassNameConfigurator.useClassNamesOverride)(_tabsListClasses.getTabsListUtilityClass));
};

/**
 *
 * Demos:
 *
 * - [Tabs](https://mui.com/base-ui/react-tabs/)
 *
 * API:
 *
 * - [TabsList API](https://mui.com/base-ui/react-tabs/components-api/#tabs-list)
 */
const TabsList = exports.TabsList = /*#__PURE__*/React.forwardRef(function TabsList(props, forwardedRef) {
  const {
    children,
    slotProps = {},
    slots = {},
    ...other
  } = props;
  const {
    isRtl,
    orientation,
    getRootProps,
    contextValue
  } = (0, _useTabsList.useTabsList)({
    rootRef: forwardedRef
  });
  const ownerState = {
    ...props,
    isRtl,
    orientation
  };
  const classes = useUtilityClasses(ownerState);
  const TabsListRoot = slots.root ?? 'div';
  const tabsListRootProps = (0, _utils.useSlotProps)({
    elementType: TabsListRoot,
    getSlotProps: getRootProps,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    ownerState,
    className: classes.root
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_TabsListProvider.TabsListProvider, {
    value: contextValue,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(TabsListRoot, {
      ...tabsListRootProps,
      children: children
    })
  });
});
process.env.NODE_ENV !== "production" ? TabsList.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: _propTypes.default.node,
  /**
   * @ignore
   */
  className: _propTypes.default.string,
  /**
   * The props used for each slot inside the TabsList.
   * @default {}
   */
  slotProps: _propTypes.default.shape({
    root: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object])
  }),
  /**
   * The components used for each slot inside the TabsList.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: _propTypes.default.shape({
    root: _propTypes.default.elementType
  })
} : void 0;