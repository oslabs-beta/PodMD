"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTabPanel = useTabPanel;
var React = _interopRequireWildcard(require("react"));
var _utils = require("@mui/utils");
var _Tabs = require("../Tabs");
var _useCompound = require("../useCompound");
function tabPanelValueGenerator(otherTabPanelValues) {
  return otherTabPanelValues.size;
}

/**
 *
 * Demos:
 *
 * - [Tabs](https://mui.com/base-ui/react-tabs/#hooks)
 *
 * API:
 *
 * - [useTabPanel API](https://mui.com/base-ui/react-tabs/hooks-api/#use-tab-panel)
 */
function useTabPanel(parameters) {
  const {
    value: valueParam,
    id: idParam,
    rootRef: externalRef
  } = parameters;
  const context = (0, _Tabs.useTabsContext)();
  if (context === null) {
    throw new Error('No TabContext provided');
  }
  const {
    value: selectedTabValue,
    getTabId
  } = context;
  const id = (0, _utils.unstable_useId)(idParam);
  const ref = React.useRef(null);
  const handleRef = (0, _utils.unstable_useForkRef)(ref, externalRef);
  const metadata = React.useMemo(() => ({
    id,
    ref
  }), [id]);
  const {
    id: value
  } = (0, _useCompound.useCompoundItem)(valueParam ?? tabPanelValueGenerator, metadata);
  const hidden = value !== selectedTabValue;
  const correspondingTabId = value !== undefined ? getTabId(value) : undefined;
  const getRootProps = (externalProps = {}) => {
    return {
      'aria-labelledby': correspondingTabId ?? undefined,
      hidden,
      id: id ?? undefined,
      ...externalProps,
      ref: handleRef
    };
  };
  return {
    hidden,
    getRootProps,
    rootRef: handleRef
  };
}