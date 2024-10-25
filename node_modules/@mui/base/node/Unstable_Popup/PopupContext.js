"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PopupContext = void 0;
var React = _interopRequireWildcard(require("react"));
const PopupContext = exports.PopupContext = /*#__PURE__*/React.createContext(null);
if (process.env.NODE_ENV !== 'production') {
  PopupContext.displayName = 'PopupContext';
}