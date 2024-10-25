'use client';

import * as React from 'react';
import { unstable_useForkRef as useForkRef, unstable_useId as useId } from '@mui/utils';
import { extractEventHandlers } from "../utils/extractEventHandlers.js";
import { useListItem } from "../useList/index.js";
import { useCompoundItem } from "../useCompound/index.js";
import { useButton } from "../useButton/index.js";
import { combineHooksSlotProps } from "../utils/combineHooksSlotProps.js";
/**
 *
 * Demos:
 *
 * - [Select](https://mui.com/base-ui/react-select/#hooks)
 *
 * API:
 *
 * - [useOption API](https://mui.com/base-ui/react-select/hooks-api/#use-option)
 */
export function useOption(params) {
  const {
    value,
    label,
    disabled,
    rootRef: optionRefParam,
    id: idParam
  } = params;
  const {
    getRootProps: getListItemProps,
    highlighted,
    selected
  } = useListItem({
    item: value
  });
  const {
    getRootProps: getButtonProps,
    rootRef: buttonRefHandler
  } = useButton({
    disabled,
    focusableWhenDisabled: true
  });
  const id = useId(idParam);
  const optionRef = React.useRef(null);
  const selectOption = React.useMemo(() => ({
    disabled,
    label,
    value,
    ref: optionRef,
    id
  }), [disabled, label, value, id]);
  const {
    index
  } = useCompoundItem(value, selectOption);
  const handleRef = useForkRef(optionRefParam, optionRef, buttonRefHandler);
  const createHandleKeyDown = otherHandlers => event => {
    otherHandlers.onKeyDown?.(event);
    if (event.defaultMuiPrevented) {
      return;
    }
    if ([' ', 'Enter'].includes(event.key)) {
      event.defaultMuiPrevented = true; // prevent listbox onKeyDown
    }
  };
  const getOwnHandlers = (otherHandlers = {}) => ({
    onKeyDown: createHandleKeyDown(otherHandlers)
  });
  return {
    getRootProps: (externalProps = {}) => {
      const externalEventHandlers = extractEventHandlers(externalProps);
      const getCombinedRootProps = combineHooksSlotProps(getListItemProps, combineHooksSlotProps(getButtonProps, getOwnHandlers));
      return {
        ...externalProps,
        ...externalEventHandlers,
        ...getCombinedRootProps(externalEventHandlers),
        id,
        ref: handleRef,
        role: 'option',
        'aria-selected': selected
      };
    },
    highlighted,
    index,
    selected,
    rootRef: handleRef
  };
}