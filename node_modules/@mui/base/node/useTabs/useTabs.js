"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTabs = useTabs;
var React = _interopRequireWildcard(require("react"));
var _utils = require("@mui/utils");
var _useCompound = require("../useCompound");
/**
 *
 * Demos:
 *
 * - [Tabs](https://mui.com/base-ui/react-tabs/#hooks)
 *
 * API:
 *
 * - [useTabs API](https://mui.com/base-ui/react-tabs/hooks-api/#use-tabs)
 */
function useTabs(parameters) {
  const {
    value: valueProp,
    defaultValue,
    onChange,
    orientation = 'horizontal',
    direction = 'ltr',
    selectionFollowsFocus = false
  } = parameters;
  const [value, setValue] = (0, _utils.unstable_useControlled)({
    controlled: valueProp,
    default: defaultValue,
    name: 'Tabs',
    state: 'value'
  });
  const onSelected = React.useCallback((event, newValue) => {
    setValue(newValue);
    onChange?.(event, newValue);
  }, [onChange, setValue]);
  const {
    subitems: tabPanels,
    contextValue: compoundComponentContextValue
  } = (0, _useCompound.useCompoundParent)();
  const tabIdLookup = React.useRef(() => undefined);
  const getTabPanelId = React.useCallback(tabValue => {
    return tabPanels.get(tabValue)?.id;
  }, [tabPanels]);
  const getTabId = React.useCallback(tabPanelId => {
    return tabIdLookup.current(tabPanelId);
  }, []);
  const registerTabIdLookup = React.useCallback(lookupFunction => {
    tabIdLookup.current = lookupFunction;
  }, []);
  return {
    contextValue: {
      direction,
      getTabId,
      getTabPanelId,
      onSelected,
      orientation,
      registerTabIdLookup,
      selectionFollowsFocus,
      value,
      ...compoundComponentContextValue
    }
  };
}