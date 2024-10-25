"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectProvider = SelectProvider;
var React = _interopRequireWildcard(require("react"));
var _ListContext = require("../useList/ListContext");
var _useCompound = require("../useCompound");
var _jsxRuntime = require("react/jsx-runtime");
/**
 * Sets up the contexts for the underlying Option components.
 *
 * @ignore - do not document.
 */
function SelectProvider(props) {
  const {
    value,
    children
  } = props;
  const {
    dispatch,
    getItemIndex,
    getItemState,
    registerItem,
    totalSubitemCount
  } = value;
  const listContextValue = React.useMemo(() => ({
    dispatch,
    getItemState,
    getItemIndex
  }), [dispatch, getItemIndex, getItemState]);
  const compoundComponentContextValue = React.useMemo(() => ({
    getItemIndex,
    registerItem,
    totalSubitemCount
  }), [registerItem, getItemIndex, totalSubitemCount]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_useCompound.CompoundComponentContext.Provider, {
    value: compoundComponentContextValue,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ListContext.ListContext.Provider, {
      value: listContextValue,
      children: children
    })
  });
}