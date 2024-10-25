"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CssAnimation = CssAnimation;
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _clsx = _interopRequireDefault(require("clsx"));
var _useTransition = require("../useTransition");
var _jsxRuntime = require("react/jsx-runtime");
/**
 *
 * Demos:
 *
 * - [Transitions](https://mui.com/base-ui/react-transitions/)
 *
 * API:
 *
 * - [CssAnimation API](https://mui.com/base-ui/react-transitions/components-api/#css-animation)
 */
function CssAnimation(props) {
  const {
    children,
    className,
    enterAnimationName,
    enterClassName,
    exitAnimationName,
    exitClassName,
    ...other
  } = props;
  const {
    requestedEnter,
    onExited
  } = (0, _useTransition.useTransitionStateManager)();
  const hasExited = React.useRef(true);
  React.useEffect(() => {
    if (requestedEnter && hasExited.current) {
      hasExited.current = false;
    }
  }, [requestedEnter]);
  const handleAnimationEnd = React.useCallback(event => {
    if (event.animationName === exitAnimationName) {
      onExited();
      hasExited.current = true;
    } else if (event.animationName === enterAnimationName) {
      hasExited.current = false;
    }
  }, [onExited, exitAnimationName, enterAnimationName]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    onAnimationEnd: handleAnimationEnd,
    className: (0, _clsx.default)(className, requestedEnter ? enterClassName : exitClassName),
    ...other,
    children: children
  });
}
process.env.NODE_ENV !== "production" ? CssAnimation.propTypes = {
  children: _propTypes.default.node,
  className: _propTypes.default.string,
  enterAnimationName: _propTypes.default.string,
  enterClassName: _propTypes.default.string,
  exitAnimationName: _propTypes.default.string,
  exitClassName: _propTypes.default.string
} : void 0;