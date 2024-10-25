"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListContext = void 0;
var React = _interopRequireWildcard(require("react"));
const ListContext = exports.ListContext = /*#__PURE__*/React.createContext(null);
if (process.env.NODE_ENV !== 'production') {
  ListContext.displayName = 'ListContext';
}