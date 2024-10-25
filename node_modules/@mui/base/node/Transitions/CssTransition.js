"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CssTransition = void 0;
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _clsx = _interopRequireDefault(require("clsx"));
var _useTransition = require("../useTransition");
var _jsxRuntime = require("react/jsx-runtime");
/**
 * A utility component that hooks up to the Base UI transitions API and
 * applies a CSS transition to its children when necessary.
 *
 * Demos:
 *
 * - [Transitions](https://mui.com/base-ui/react-transitions/)
 *
 * API:
 *
 * - [CssTransition API](https://mui.com/base-ui/react-transitions/components-api/#css-transition)
 */
const CssTransition = exports.CssTransition = /*#__PURE__*/React.forwardRef(function CssTransition(props, forwardedRef) {
  const {
    children,
    className,
    lastTransitionedPropertyOnExit,
    enterClassName,
    exitClassName,
    ...other
  } = props;
  const {
    requestedEnter,
    onExited
  } = (0, _useTransition.useTransitionStateManager)();
  const [isEntering, setIsEntering] = React.useState(false);

  // The `isEntering` state (which is used to determine the right CSS class to apply)
  // is updated slightly (one animation frame) after the `requestedEnter` state is updated.
  // Thanks to this, elements that are mounted will have their enter transition applied
  // (if the `enterClassName` was applied when the element was mounted, the transition would not be fired).
  React.useEffect(() => {
    if (requestedEnter) {
      requestAnimationFrame(() => {
        setIsEntering(true);
      });
    } else {
      setIsEntering(false);
    }
  }, [requestedEnter]);
  const handleTransitionEnd = React.useCallback(event => {
    if (!requestedEnter && (lastTransitionedPropertyOnExit == null || event.propertyName === lastTransitionedPropertyOnExit)) {
      onExited();
    }
  }, [onExited, requestedEnter, lastTransitionedPropertyOnExit]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    onTransitionEnd: handleTransitionEnd,
    className: (0, _clsx.default)(className, isEntering ? enterClassName : exitClassName),
    ...other,
    ref: forwardedRef,
    children: children
  });
});
process.env.NODE_ENV !== "production" ? CssTransition.propTypes = {
  children: _propTypes.default.node,
  className: _propTypes.default.string,
  enterClassName: _propTypes.default.string,
  exitClassName: _propTypes.default.string,
  lastTransitionedPropertyOnEnter: _propTypes.default.string,
  lastTransitionedPropertyOnExit: _propTypes.default.string
} : void 0;