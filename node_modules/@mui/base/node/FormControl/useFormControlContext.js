"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useFormControlContext = useFormControlContext;
var React = _interopRequireWildcard(require("react"));
var _FormControlContext = require("./FormControlContext");
/**
 *
 * Demos:
 *
 * - [Form Control](https://mui.com/base-ui/react-form-control/#hook)
 *
 * API:
 *
 * - [useFormControlContext API](https://mui.com/base-ui/react-form-control/hooks-api/#use-form-control-context)
 */
function useFormControlContext() {
  return React.useContext(_FormControlContext.FormControlContext);
}