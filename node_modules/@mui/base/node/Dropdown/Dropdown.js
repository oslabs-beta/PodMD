"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dropdown = Dropdown;
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _utils = require("@mui/utils");
var _DropdownContext = require("../useDropdown/DropdownContext");
var _useDropdown = require("../useDropdown/useDropdown");
var _jsxRuntime = require("react/jsx-runtime");
/**
 *
 * Demos:
 *
 * - [Menu](https://mui.com/base-ui/react-menu/)
 *
 * API:
 *
 * - [Dropdown API](https://mui.com/base-ui/react-menu/components-api/#dropdown)
 */function Dropdown(props) {
  const {
    children,
    open,
    defaultOpen,
    onOpenChange
  } = props;
  const {
    contextValue
  } = (0, _useDropdown.useDropdown)({
    defaultOpen,
    onOpenChange,
    open
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_DropdownContext.DropdownContext.Provider, {
    value: contextValue,
    children: children
  });
}
process.env.NODE_ENV !== "production" ? Dropdown.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: _propTypes.default.node,
  /**
   * If `true`, the dropdown is initially open.
   */
  defaultOpen: _propTypes.default.bool,
  /**
   * Callback fired when the component requests to be opened or closed.
   */
  onOpenChange: _propTypes.default.func,
  /**
   * Allows to control whether the dropdown is open.
   * This is a controlled counterpart of `defaultOpen`.
   */
  open: _propTypes.default.bool
} : void 0;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line
  Dropdown['propTypes' + ''] = (0, _utils.exactProp)(Dropdown.propTypes);
}