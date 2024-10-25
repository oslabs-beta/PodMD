"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OptionGroup = void 0;
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _composeClasses = require("../composeClasses");
var _optionGroupClasses = require("./optionGroupClasses");
var _utils = require("../utils");
var _ClassNameConfigurator = require("../utils/ClassNameConfigurator");
var _jsxRuntime = require("react/jsx-runtime");
function useUtilityClasses(disabled) {
  const slots = {
    root: ['root', disabled && 'disabled'],
    label: ['label'],
    list: ['list']
  };
  return (0, _composeClasses.unstable_composeClasses)(slots, (0, _ClassNameConfigurator.useClassNamesOverride)(_optionGroupClasses.getOptionGroupUtilityClass));
}

/**
 * An unstyled option group to be used within a Select.
 *
 * Demos:
 *
 * - [Select](https://mui.com/base-ui/react-select/)
 *
 * API:
 *
 * - [OptionGroup API](https://mui.com/base-ui/react-select/components-api/#option-group)
 */
const OptionGroup = exports.OptionGroup = /*#__PURE__*/React.forwardRef(function OptionGroup(props, forwardedRef) {
  const {
    disabled = false,
    slotProps = {},
    slots = {},
    ...other
  } = props;
  const Root = slots?.root || 'li';
  const Label = slots?.label || 'span';
  const List = slots?.list || 'ul';
  const classes = useUtilityClasses(disabled);
  const rootProps = (0, _utils.useSlotProps)({
    elementType: Root,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: forwardedRef
    },
    ownerState: props,
    className: classes.root
  });
  const labelProps = (0, _utils.useSlotProps)({
    elementType: Label,
    externalSlotProps: slotProps.label,
    ownerState: props,
    className: classes.label
  });
  const listProps = (0, _utils.useSlotProps)({
    elementType: List,
    externalSlotProps: slotProps.list,
    ownerState: props,
    className: classes.list
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(Root, {
    ...rootProps,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(Label, {
      ...labelProps,
      children: props.label
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(List, {
      ...listProps,
      children: props.children
    })]
  });
});
process.env.NODE_ENV !== "production" ? OptionGroup.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: _propTypes.default.node,
  /**
   * @ignore
   */
  className: _propTypes.default.string,
  /**
   * If `true` all the options in the group will be disabled.
   * @default false
   */
  disabled: _propTypes.default.bool,
  /**
   * The human-readable description of the group.
   */
  label: _propTypes.default.node,
  /**
   * The props used for each slot inside the Input.
   * @default {}
   */
  slotProps: _propTypes.default.shape({
    label: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
    list: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
    root: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object])
  }),
  /**
   * The components used for each slot inside the OptionGroup.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: _propTypes.default.shape({
    label: _propTypes.default.elementType,
    list: _propTypes.default.elementType,
    root: _propTypes.default.elementType
  })
} : void 0;