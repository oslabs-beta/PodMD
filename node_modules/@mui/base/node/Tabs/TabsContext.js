"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabsContext = void 0;
exports.useTabsContext = useTabsContext;
var React = _interopRequireWildcard(require("react"));
/**
 * @ignore - internal component.
 */
const TabsContext = exports.TabsContext = /*#__PURE__*/React.createContext(null);
if (process.env.NODE_ENV !== 'production') {
  TabsContext.displayName = 'TabsContext';
}
function useTabsContext() {
  const context = React.useContext(TabsContext);
  if (context == null) {
    throw new Error('No TabsContext provided');
  }
  return context;
}