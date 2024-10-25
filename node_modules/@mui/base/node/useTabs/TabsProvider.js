"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabsProvider = TabsProvider;
var React = _interopRequireWildcard(require("react"));
var _TabsContext = require("../Tabs/TabsContext");
var _useCompound = require("../useCompound");
var _jsxRuntime = require("react/jsx-runtime");
/**
 * Sets up the contexts for the underlying Tab and TabPanel components.
 *
 * @ignore - do not document.
 */
function TabsProvider(props) {
  const {
    value: valueProp,
    children
  } = props;
  const {
    direction,
    getItemIndex,
    onSelected,
    orientation,
    registerItem,
    registerTabIdLookup,
    selectionFollowsFocus,
    totalSubitemCount,
    value,
    getTabId,
    getTabPanelId
  } = valueProp;
  const compoundComponentContextValue = React.useMemo(() => ({
    getItemIndex,
    registerItem,
    totalSubitemCount
  }), [registerItem, getItemIndex, totalSubitemCount]);
  const tabsContextValue = React.useMemo(() => ({
    direction,
    getTabId,
    getTabPanelId,
    onSelected,
    orientation,
    registerTabIdLookup,
    selectionFollowsFocus,
    value
  }), [direction, getTabId, getTabPanelId, onSelected, orientation, registerTabIdLookup, selectionFollowsFocus, value]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_useCompound.CompoundComponentContext.Provider, {
    value: compoundComponentContextValue,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_TabsContext.TabsContext.Provider, {
      value: tabsContextValue,
      children: children
    })
  });
}