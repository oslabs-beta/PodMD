'use client';

import * as React from 'react';
import PropTypes from 'prop-types';
import { useSlotProps } from "../utils/index.js";
import { useMenuButton } from "../useMenuButton/index.js";
import { unstable_composeClasses as composeClasses } from "../composeClasses/index.js";
import { useClassNamesOverride } from "../utils/ClassNameConfigurator.js";
import { getMenuButtonUtilityClass } from "./menuButtonClasses.js";
import { jsx as _jsx } from "react/jsx-runtime";
const useUtilityClasses = ownerState => {
  const {
    active,
    disabled,
    open
  } = ownerState;
  const slots = {
    root: ['root', disabled && 'disabled', active && 'active', open && 'expanded']
  };
  return composeClasses(slots, useClassNamesOverride(getMenuButtonUtilityClass));
};

/**
 *
 * Demos:
 *
 * - [Menu](https://mui.com/base-ui/react-menu/)
 *
 * API:
 *
 * - [MenuButton API](https://mui.com/base-ui/react-menu/components-api/#menu-button)
 */
const MenuButton = /*#__PURE__*/React.forwardRef(function MenuButton(props, forwardedRef) {
  const {
    children,
    disabled = false,
    label,
    slots = {},
    slotProps = {},
    focusableWhenDisabled = false,
    ...other
  } = props;
  const {
    getRootProps,
    open,
    active
  } = useMenuButton({
    disabled,
    focusableWhenDisabled,
    rootRef: forwardedRef
  });
  const ownerState = {
    ...props,
    open,
    active,
    disabled,
    focusableWhenDisabled
  };
  const classes = useUtilityClasses(ownerState);
  const Root = slots.root || 'button';
  const rootProps = useSlotProps({
    elementType: Root,
    getSlotProps: getRootProps,
    externalForwardedProps: other,
    externalSlotProps: slotProps.root,
    additionalProps: {
      ref: forwardedRef,
      type: 'button'
    },
    ownerState,
    className: classes.root
  });
  return /*#__PURE__*/_jsx(Root, {
    ...rootProps,
    children: children
  });
});
process.env.NODE_ENV !== "production" ? MenuButton.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * Class name applied to the root element.
   */
  className: PropTypes.string,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, allows a disabled button to receive focus.
   * @default false
   */
  focusableWhenDisabled: PropTypes.bool,
  /**
   * Label of the button
   */
  label: PropTypes.string,
  /**
   * The components used for each slot inside the MenuButton.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The props used for each slot inside the MenuButton.
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType
  })
} : void 0;
export { MenuButton };