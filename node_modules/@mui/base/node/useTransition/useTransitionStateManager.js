"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTransitionStateManager = useTransitionStateManager;
var React = _interopRequireWildcard(require("react"));
var _TransitionContext = require("./TransitionContext");
/**
 * Allows an element to be transitioned in and out.
 * The transition is triggerred by a `TransitionContext` placed above in the component tree.
 *
 * Demos:
 *
 * - [Transitions](https://mui.com/base-ui/react-transitions/#hooks)
 *
 * API:
 *
 * - [useTransitionStateManager API](https://mui.com/base-ui/react-transitions/hooks-api/#use-transition-state-manager)
 */
function useTransitionStateManager() {
  const transitionContext = React.useContext(_TransitionContext.TransitionContext);
  if (!transitionContext) {
    throw new Error('Missing transition context');
  }
  const {
    registerTransition,
    requestedEnter,
    onExited
  } = transitionContext;
  React.useEffect(() => {
    return registerTransition();
  }, [registerTransition]);
  return {
    onExited,
    requestedEnter
  };
}