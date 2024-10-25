"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prepareForSlot = prepareForSlot;
var React = _interopRequireWildcard(require("react"));
function prepareForSlot(Component) {
  return /*#__PURE__*/React.forwardRef(function Slot(props, ref) {
    const {
      ownerState,
      ...other
    } = props;
    return /*#__PURE__*/React.createElement(Component, {
      ...other,
      ref
    });
  });
}