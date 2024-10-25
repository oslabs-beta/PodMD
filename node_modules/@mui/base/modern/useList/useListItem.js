'use client';

import * as React from 'react';
import { extractEventHandlers } from "../utils/extractEventHandlers.js";
import { ListActionTypes } from "./listActions.types.js";
import { ListContext } from "./ListContext.js";

/**
 * Contains the logic for an item of a list-like component (for example Select, Menu, etc.).
 * It handles the item's mouse events and tab index.
 *
 * @template ItemValue The type of the item's value. This should be consistent with the type of useList's `items` parameter.
 * @ignore - internal hook.
 */
export function useListItem(parameters) {
  const {
    handlePointerOverEvents = false,
    item
  } = parameters;
  const listContext = React.useContext(ListContext);
  if (!listContext) {
    throw new Error('useListItem must be used within a ListProvider');
  }
  const {
    dispatch,
    getItemState
  } = listContext;
  const {
    highlighted,
    selected,
    focusable
  } = getItemState(item);
  const createHandleClick = React.useCallback(externalHandlers => event => {
    externalHandlers.onClick?.(event);
    if (event.defaultPrevented) {
      return;
    }
    if (process.env.NODE_ENV !== 'production') {
      if (item === undefined) {
        throw new Error(['MUI: The `item` provided to useListItem() is undefined.', 'This should happen only during server-side rendering under React 17.'].join('\n'));
      }
    }
    dispatch({
      type: ListActionTypes.itemClick,
      item: item,
      event
    });
  }, [dispatch, item]);
  const createHandlePointerOver = React.useCallback(externalHandlers => event => {
    externalHandlers.onMouseOver?.(event);
    if (event.defaultPrevented) {
      return;
    }
    if (process.env.NODE_ENV !== 'production') {
      if (item === undefined) {
        throw new Error(['MUI: The `item` provided to useListItem() is undefined.', 'This should happen only during server-side rendering under React 17.'].join('\n'));
      }
    }
    dispatch({
      type: ListActionTypes.itemHover,
      item: item,
      event
    });
  }, [dispatch, item]);
  let tabIndex;
  if (focusable) {
    tabIndex = highlighted ? 0 : -1;
  }
  const getRootProps = (externalProps = {}) => {
    const externalEventHandlers = extractEventHandlers(externalProps);
    return {
      ...externalProps,
      onClick: createHandleClick(externalEventHandlers),
      onPointerOver: handlePointerOverEvents ? createHandlePointerOver(externalEventHandlers) : undefined,
      tabIndex
    };
  };
  return {
    getRootProps,
    highlighted,
    selected
  };
}