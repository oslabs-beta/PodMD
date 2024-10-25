"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransitionContext = void 0;
var React = _interopRequireWildcard(require("react"));
const TransitionContext = exports.TransitionContext = /*#__PURE__*/React.createContext(null);
if (process.env.NODE_ENV !== 'production') {
  TransitionContext.displayName = 'TransitionContext';
}