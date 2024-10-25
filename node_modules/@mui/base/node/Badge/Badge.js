"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Badge = void 0;
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _composeClasses = require("../composeClasses");
var _useBadge = require("../useBadge");
var _badgeClasses = require("./badgeClasses");
var _utils = require("../utils");
var _ClassNameConfigurator = require("../utils/ClassNameConfigurator");
var _jsxRuntime = require("react/jsx-runtime");
const useUtilityClasses = ownerState => {
  const {
    invisible
  } = ownerState;
  const slots = {
    root: ['root'],
    badge: ['badge', invisible && 'invisible']
  };
  return (0, _composeClasses.unstable_composeClasses)(slots, (0, _ClassNameConfigurator.useClassNamesOverride)(_badgeClasses.getBadgeUtilityClass));
};
/**
 *
 * Demos:
 *
 * - [Badge](https://mui.com/base-ui/react-badge/)
 *
 * API:
 *
 * - [Badge API](https://mui.com/base-ui/react-badge/components-api/#badge)
 */
const Badge = exports.Badge = /*#__PURE__*/React.forwardRef(function Badge(props, forwardedRef) {
  const {
    badgeContent: badgeContentProp,
    children,
    invisible: invisibleProp,
    max: maxProp = 99,
    slotProps = {},
    slots = {},
    showZero = false,
    ...other
  } = props;
  const {
    badgeContent,
    max,
    displayValue,
    invisible
  } = (0, _useBadge.useBadge)({
    ...props,
    max: maxProp
  });
  const ownerState = {
    ...props,
    badgeContent,
    invisible,
    max,
    showZero
  };
  const classes = useUtilityClasses(ownerState);
  const Root = slots.root ?? 'span';
  const rootProps = (0, _utils.useSlotProps)({
    elementType: Root,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: forwardedRef
    },
    ownerState,
    className: classes.root
  });
  const BadgeComponent = slots.badge ?? 'span';
  const badgeProps = (0, _utils.useSlotProps)({
    elementType: BadgeComponent,
    externalSlotProps: slotProps.badge,
    ownerState,
    className: classes.badge
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(Root, {
    ...rootProps,
    children: [children, /*#__PURE__*/(0, _jsxRuntime.jsx)(BadgeComponent, {
      ...badgeProps,
      children: displayValue
    })]
  });
});
process.env.NODE_ENV !== "production" ? Badge.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content rendered within the badge.
   */
  badgeContent: _propTypes.default.node,
  /**
   * The badge will be added relative to this node.
   */
  children: _propTypes.default.node,
  /**
   * If `true`, the badge is invisible.
   * @default false
   */
  invisible: _propTypes.default.bool,
  /**
   * Max count to show.
   * @default 99
   */
  max: _propTypes.default.number,
  /**
   * Controls whether the badge is hidden when `badgeContent` is zero.
   * @default false
   */
  showZero: _propTypes.default.bool,
  /**
   * The props used for each slot inside the Badge.
   * @default {}
   */
  slotProps: _propTypes.default.shape({
    badge: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
    root: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object])
  }),
  /**
   * The components used for each slot inside the Badge.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: _propTypes.default.shape({
    badge: _propTypes.default.elementType,
    root: _propTypes.default.elementType
  })
} : void 0;