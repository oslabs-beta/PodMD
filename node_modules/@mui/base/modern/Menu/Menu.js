'use client';

import * as React from 'react';
import PropTypes from 'prop-types';
import { HTMLElementType, refType } from '@mui/utils';
import { getMenuUtilityClass } from "./menuClasses.js";
import { useMenu } from "../useMenu/index.js";
import { MenuProvider } from "../useMenu/MenuProvider.js";
import { unstable_composeClasses as composeClasses } from "../composeClasses/index.js";
import { Unstable_Popup as Popup } from "../Unstable_Popup/index.js";
import { useSlotProps } from "../utils/useSlotProps.js";
import { useClassNamesOverride } from "../utils/ClassNameConfigurator.js";
import { ListActionTypes } from "../useList/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
function useUtilityClasses(ownerState) {
  const {
    open
  } = ownerState;
  const slots = {
    root: ['root', open && 'expanded'],
    listbox: ['listbox', open && 'expanded']
  };
  return composeClasses(slots, useClassNamesOverride(getMenuUtilityClass));
}

/**
 *
 * Demos:
 *
 * - [Menu](https://mui.com/base-ui/react-menu/)
 *
 * API:
 *
 * - [Menu API](https://mui.com/base-ui/react-menu/components-api/#menu)
 */
const Menu = /*#__PURE__*/React.forwardRef(function Menu(props, forwardedRef) {
  const {
    actions,
    anchor: anchorProp,
    children,
    onItemsChange,
    slotProps = {},
    slots = {},
    ...other
  } = props;
  const {
    contextValue,
    getListboxProps,
    dispatch,
    open,
    triggerElement
  } = useMenu({
    onItemsChange,
    componentName: 'Menu'
  });
  const anchor = anchorProp ?? triggerElement;
  React.useImperativeHandle(actions, () => ({
    dispatch,
    resetHighlight: () => dispatch({
      type: ListActionTypes.resetHighlight,
      event: null
    })
  }), [dispatch]);
  const ownerState = {
    ...props,
    open
  };
  const classes = useUtilityClasses(ownerState);
  const Root = slots.root ?? 'div';
  const rootProps = useSlotProps({
    elementType: Root,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: forwardedRef,
      role: undefined
    },
    className: classes.root,
    ownerState
  });
  const Listbox = slots.listbox ?? 'ul';
  const listboxProps = useSlotProps({
    elementType: Listbox,
    getSlotProps: getListboxProps,
    externalSlotProps: slotProps.listbox,
    className: classes.listbox,
    ownerState
  });
  if (open === true && anchor == null) {
    return /*#__PURE__*/_jsx(Root, {
      ...rootProps,
      children: /*#__PURE__*/_jsx(Listbox, {
        ...listboxProps,
        children: /*#__PURE__*/_jsx(MenuProvider, {
          value: contextValue,
          children: children
        })
      })
    });
  }
  return /*#__PURE__*/_jsx(Popup, {
    keepMounted: true,
    ...rootProps,
    open: open,
    anchor: anchor,
    slots: {
      root: Root
    },
    children: /*#__PURE__*/_jsx(Listbox, {
      ...listboxProps,
      children: /*#__PURE__*/_jsx(MenuProvider, {
        value: contextValue,
        children: children
      })
    })
  });
});
process.env.NODE_ENV !== "production" ? Menu.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref with imperative actions that can be performed on the menu.
   */
  actions: refType,
  /**
   * The element based on which the menu is positioned.
   */
  anchor: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([HTMLElementType, PropTypes.object, PropTypes.func]),
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Function called when the items displayed in the menu change.
   */
  onItemsChange: PropTypes.func,
  /**
   * The props used for each slot inside the Menu.
   * @default {}
   */
  slotProps: PropTypes.shape({
    listbox: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The components used for each slot inside the Menu.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    listbox: PropTypes.elementType,
    root: PropTypes.elementType
  })
} : void 0;
export { Menu };