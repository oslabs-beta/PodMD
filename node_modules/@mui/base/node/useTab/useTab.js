"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTab = useTab;
var React = _interopRequireWildcard(require("react"));
var _utils = require("@mui/utils");
var _Tabs = require("../Tabs");
var _extractEventHandlers = require("../utils/extractEventHandlers");
var _useCompound = require("../useCompound");
var _useList = require("../useList");
var _useButton = require("../useButton");
var _combineHooksSlotProps = require("../utils/combineHooksSlotProps");
function tabValueGenerator(otherTabValues) {
  return otherTabValues.size;
}

/**
 *
 * Demos:
 *
 * - [Tabs](https://mui.com/base-ui/react-tabs/#hooks)
 *
 * API:
 *
 * - [useTab API](https://mui.com/base-ui/react-tabs/hooks-api/#use-tab)
 */
function useTab(parameters) {
  const {
    value: valueParam,
    rootRef: externalRef,
    disabled = false,
    id: idParam
  } = parameters;
  const tabRef = React.useRef(null);
  const id = (0, _utils.unstable_useId)(idParam);
  const {
    value: selectedValue,
    selectionFollowsFocus,
    getTabPanelId
  } = (0, _Tabs.useTabsContext)();
  const tabMetadata = React.useMemo(() => ({
    disabled,
    ref: tabRef,
    id
  }), [disabled, tabRef, id]);
  const {
    id: value,
    index,
    totalItemCount: totalTabsCount
  } = (0, _useCompound.useCompoundItem)(valueParam ?? tabValueGenerator, tabMetadata);
  const {
    getRootProps: getTabProps,
    highlighted,
    selected
  } = (0, _useList.useListItem)({
    item: value
  });
  const {
    getRootProps: getButtonProps,
    rootRef: buttonRefHandler,
    active,
    focusVisible,
    setFocusVisible
  } = (0, _useButton.useButton)({
    disabled,
    focusableWhenDisabled: !selectionFollowsFocus,
    type: 'button'
  });
  const handleRef = (0, _utils.unstable_useForkRef)(tabRef, externalRef, buttonRefHandler);
  const tabPanelId = value !== undefined ? getTabPanelId(value) : undefined;
  const getRootProps = (externalProps = {}) => {
    const externalEventHandlers = (0, _extractEventHandlers.extractEventHandlers)(externalProps);
    const getCombinedRootProps = (0, _combineHooksSlotProps.combineHooksSlotProps)(getTabProps, getButtonProps);
    return {
      ...externalProps,
      ...getCombinedRootProps(externalEventHandlers),
      role: 'tab',
      'aria-controls': tabPanelId,
      'aria-selected': selected,
      id,
      ref: handleRef
    };
  };
  return {
    getRootProps,
    active,
    focusVisible,
    highlighted,
    index,
    rootRef: handleRef,
    // the `selected` state isn't set on the server (it relies on effects to be calculated),
    // so we fall back to checking the `value` prop with the selectedValue from the TabsContext
    selected: selected || value === selectedValue,
    setFocusVisible,
    totalTabsCount
  };
}