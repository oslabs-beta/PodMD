"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useMenuItem = useMenuItem;
var React = _interopRequireWildcard(require("react"));
var _utils = require("@mui/utils");
var _useButton = require("../useButton");
var _useList = require("../useList");
var _useDropdown = require("../useDropdown");
var _DropdownContext = require("../useDropdown/DropdownContext");
var _combineHooksSlotProps = require("../utils/combineHooksSlotProps");
var _useCompound = require("../useCompound");
var _extractEventHandlers = require("../utils/extractEventHandlers");
function idGenerator(existingKeys) {
  return `menu-item-${existingKeys.size}`;
}
const FALLBACK_MENU_CONTEXT = {
  dispatch: () => {},
  popupId: '',
  registerPopup: () => {},
  registerTrigger: () => {},
  state: {
    open: true,
    changeReason: null
  },
  triggerElement: null
};

/**
 *
 * Demos:
 *
 * - [Menu](https://mui.com/base-ui/react-menu/#hooks)
 *
 * API:
 *
 * - [useMenuItem API](https://mui.com/base-ui/react-menu/hooks-api/#use-menu-item)
 */
function useMenuItem(params) {
  const {
    disabled = false,
    id: idParam,
    rootRef: externalRef,
    label,
    disableFocusOnHover = false
  } = params;
  const id = (0, _utils.unstable_useId)(idParam);
  const itemRef = React.useRef(null);
  const itemMetadata = React.useMemo(() => ({
    disabled,
    id: id ?? '',
    label,
    ref: itemRef
  }), [disabled, id, label]);
  const {
    dispatch
  } = React.useContext(_DropdownContext.DropdownContext) ?? FALLBACK_MENU_CONTEXT;
  const {
    getRootProps: getListRootProps,
    highlighted
  } = (0, _useList.useListItem)({
    item: id,
    handlePointerOverEvents: !disableFocusOnHover
  });
  const {
    index,
    totalItemCount
  } = (0, _useCompound.useCompoundItem)(id ?? idGenerator, itemMetadata);
  const {
    getRootProps: getButtonProps,
    focusVisible,
    rootRef: buttonRefHandler
  } = (0, _useButton.useButton)({
    disabled,
    focusableWhenDisabled: true
  });
  const handleRef = (0, _utils.unstable_useForkRef)(buttonRefHandler, externalRef, itemRef);
  React.useDebugValue({
    id,
    highlighted,
    disabled,
    label
  });
  const createHandleClick = otherHandlers => event => {
    otherHandlers.onClick?.(event);
    if (event.defaultMuiPrevented) {
      return;
    }
    dispatch({
      type: _useDropdown.DropdownActionTypes.close,
      event
    });
  };
  const getOwnHandlers = (otherHandlers = {}) => ({
    ...otherHandlers,
    onClick: createHandleClick(otherHandlers)
  });
  function getRootProps(externalProps = {}) {
    const externalEventHandlers = (0, _extractEventHandlers.extractEventHandlers)(externalProps);
    const getCombinedRootProps = (0, _combineHooksSlotProps.combineHooksSlotProps)(getOwnHandlers, (0, _combineHooksSlotProps.combineHooksSlotProps)(getButtonProps, getListRootProps));
    return {
      ...externalProps,
      ...externalEventHandlers,
      ...getCombinedRootProps(externalEventHandlers),
      id,
      ref: handleRef,
      role: 'menuitem'
    };
  }

  // If `id` is undefined (during SSR in React < 18), we fall back to rendering a simplified menu item
  // which does not have access to infortmation about its position or highlighted state.
  if (id === undefined) {
    return {
      getRootProps,
      disabled: false,
      focusVisible,
      highlighted: false,
      index: -1,
      totalItemCount: 0,
      rootRef: handleRef
    };
  }
  return {
    getRootProps,
    disabled,
    focusVisible,
    highlighted,
    index,
    totalItemCount,
    rootRef: handleRef
  };
}