"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TablePaginationActions = void 0;
var React = _interopRequireWildcard(require("react"));
var _utils = require("../utils");
var _jsxRuntime = require("react/jsx-runtime");
var _span, _span2, _span3, _span4;
function LastPageIconDefault() {
  return _span || (_span = /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    children: '⇾|'
  }));
}
function FirstPageIconDefault() {
  return _span2 || (_span2 = /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    children: '|⇽'
  }));
}
function NextPageIconDefault() {
  return _span3 || (_span3 = /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    children: '⇾'
  }));
}
function BackPageIconDefault() {
  return _span4 || (_span4 = /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    children: '⇽'
  }));
}
function defaultGetAriaLabel(type) {
  return `Go to ${type} page`;
}

/**
 * @ignore - internal component.
 */
const TablePaginationActions = exports.TablePaginationActions = /*#__PURE__*/React.forwardRef(function TablePaginationActions(props, forwardedRef) {
  const {
    count,
    getItemAriaLabel = defaultGetAriaLabel,
    onPageChange,
    page,
    rowsPerPage,
    showFirstButton = false,
    showLastButton = false,
    direction,
    // @ts-ignore
    ownerState: ownerStateProp,
    slotProps = {},
    slots = {},
    ...other
  } = props;
  const ownerState = props;
  const handleFirstPageButtonClick = event => {
    onPageChange(event, 0);
  };
  const handleBackButtonClick = event => {
    onPageChange(event, page - 1);
  };
  const handleNextButtonClick = event => {
    onPageChange(event, page + 1);
  };
  const handleLastPageButtonClick = event => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };
  const Root = slots.root ?? 'div';
  const rootProps = (0, _utils.useSlotProps)({
    elementType: Root,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: forwardedRef
    },
    ownerState
  });
  const FirstButton = slots.firstButton ?? 'button';
  const firstButtonProps = (0, _utils.useSlotProps)({
    elementType: FirstButton,
    externalSlotProps: slotProps.firstButton,
    additionalProps: {
      onClick: handleFirstPageButtonClick,
      disabled: page === 0,
      'aria-label': getItemAriaLabel('first', page),
      title: getItemAriaLabel('first', page)
    },
    ownerState
  });
  const LastButton = slots.lastButton ?? 'button';
  const lastButtonProps = (0, _utils.useSlotProps)({
    elementType: LastButton,
    externalSlotProps: slotProps.lastButton,
    additionalProps: {
      onClick: handleLastPageButtonClick,
      disabled: page >= Math.ceil(count / rowsPerPage) - 1,
      'aria-label': getItemAriaLabel('last', page),
      title: getItemAriaLabel('last', page)
    },
    ownerState
  });
  const NextButton = slots.nextButton ?? 'button';
  const nextButtonProps = (0, _utils.useSlotProps)({
    elementType: NextButton,
    externalSlotProps: slotProps.nextButton,
    additionalProps: {
      onClick: handleNextButtonClick,
      disabled: count !== -1 ? page >= Math.ceil(count / rowsPerPage) - 1 : false,
      'aria-label': getItemAriaLabel('next', page),
      title: getItemAriaLabel('next', page)
    },
    ownerState
  });
  const BackButton = slots.backButton ?? 'button';
  const backButtonProps = (0, _utils.useSlotProps)({
    elementType: BackButton,
    externalSlotProps: slotProps.backButton,
    additionalProps: {
      onClick: handleBackButtonClick,
      disabled: page === 0,
      'aria-label': getItemAriaLabel('previous', page),
      title: getItemAriaLabel('previous', page)
    },
    ownerState
  });
  const LastPageIcon = slots.lastPageIcon ?? LastPageIconDefault;
  const FirstPageIcon = slots.firstPageIcon ?? FirstPageIconDefault;
  const NextPageIcon = slots.nextPageIcon ?? NextPageIconDefault;
  const BackPageIcon = slots.backPageIcon ?? BackPageIconDefault;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(Root, {
    ...rootProps,
    children: [showFirstButton && /*#__PURE__*/(0, _jsxRuntime.jsx)(FirstButton, {
      ...firstButtonProps,
      children: direction === 'rtl' ? /*#__PURE__*/(0, _jsxRuntime.jsx)(LastPageIcon, {}) : /*#__PURE__*/(0, _jsxRuntime.jsx)(FirstPageIcon, {})
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(BackButton, {
      ...backButtonProps,
      children: direction === 'rtl' ? /*#__PURE__*/(0, _jsxRuntime.jsx)(NextPageIcon, {}) : /*#__PURE__*/(0, _jsxRuntime.jsx)(BackPageIcon, {})
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(NextButton, {
      ...nextButtonProps,
      children: direction === 'rtl' ? /*#__PURE__*/(0, _jsxRuntime.jsx)(BackPageIcon, {}) : /*#__PURE__*/(0, _jsxRuntime.jsx)(NextPageIcon, {})
    }), showLastButton && /*#__PURE__*/(0, _jsxRuntime.jsx)(LastButton, {
      ...lastButtonProps,
      children: direction === 'rtl' ? /*#__PURE__*/(0, _jsxRuntime.jsx)(FirstPageIcon, {}) : /*#__PURE__*/(0, _jsxRuntime.jsx)(LastPageIcon, {})
    })]
  });
});