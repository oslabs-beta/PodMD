'use client';

import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from "../composeClasses/index.js";
import { useSlotProps } from "../utils/index.js";
import { getTabsListUtilityClass } from "./tabsListClasses.js";
import { useTabsList } from "../useTabsList/index.js";
import { useClassNamesOverride } from "../utils/ClassNameConfigurator.js";
import { TabsListProvider } from "../useTabsList/TabsListProvider.js";
import { jsx as _jsx } from "react/jsx-runtime";
const useUtilityClasses = ownerState => {
  const {
    orientation
  } = ownerState;
  const slots = {
    root: ['root', orientation]
  };
  return composeClasses(slots, useClassNamesOverride(getTabsListUtilityClass));
};

/**
 *
 * Demos:
 *
 * - [Tabs](https://mui.com/base-ui/react-tabs/)
 *
 * API:
 *
 * - [TabsList API](https://mui.com/base-ui/react-tabs/components-api/#tabs-list)
 */
const TabsList = /*#__PURE__*/React.forwardRef(function TabsList(props, forwardedRef) {
  const {
    children,
    slotProps = {},
    slots = {},
    ...other
  } = props;
  const {
    isRtl,
    orientation,
    getRootProps,
    contextValue
  } = useTabsList({
    rootRef: forwardedRef
  });
  const ownerState = {
    ...props,
    isRtl,
    orientation
  };
  const classes = useUtilityClasses(ownerState);
  const TabsListRoot = slots.root ?? 'div';
  const tabsListRootProps = useSlotProps({
    elementType: TabsListRoot,
    getSlotProps: getRootProps,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    ownerState,
    className: classes.root
  });
  return /*#__PURE__*/_jsx(TabsListProvider, {
    value: contextValue,
    children: /*#__PURE__*/_jsx(TabsListRoot, {
      ...tabsListRootProps,
      children: children
    })
  });
});
process.env.NODE_ENV !== "production" ? TabsList.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The props used for each slot inside the TabsList.
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The components used for each slot inside the TabsList.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType
  })
} : void 0;
export { TabsList };