'use client';

import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import { unstable_composeClasses as composeClasses } from "../composeClasses/index.js";
import { getOptionUtilityClass } from "./optionClasses.js";
import { useSlotProps } from "../utils/index.js";
import { useOption, useOptionContextStabilizer } from "../useOption/index.js";
import { useClassNamesOverride } from "../utils/ClassNameConfigurator.js";
import { ListContext } from "../useList/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
function useUtilityClasses(ownerState) {
  const {
    disabled,
    highlighted,
    selected
  } = ownerState;
  const slots = {
    root: ['root', disabled && 'disabled', highlighted && 'highlighted', selected && 'selected']
  };
  return composeClasses(slots, useClassNamesOverride(getOptionUtilityClass));
}
const InnerOption = /*#__PURE__*/React.forwardRef(function InnerOption(props, forwardedRef) {
  const {
    children,
    disabled = false,
    label,
    slotProps = {},
    slots = {},
    value,
    ...other
  } = props;
  const Root = slots.root ?? 'li';
  const optionRef = React.useRef(null);
  const combinedRef = useForkRef(optionRef, forwardedRef);

  // If `label` is not explicitly provided, the `children` are used for convenience.
  // This is used to populate the select's trigger with the selected option's label.
  const computedLabel = label ?? (typeof children === 'string' ? children : optionRef.current?.textContent?.trim());
  const {
    getRootProps,
    selected,
    highlighted,
    index
  } = useOption({
    disabled,
    label: computedLabel,
    rootRef: combinedRef,
    value
  });
  const ownerState = {
    ...props,
    disabled,
    highlighted,
    index,
    selected
  };
  const classes = useUtilityClasses(ownerState);
  const rootProps = useSlotProps({
    getSlotProps: getRootProps,
    elementType: Root,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    className: classes.root,
    ownerState
  });
  return /*#__PURE__*/_jsx(Root, {
    ...rootProps,
    children: children
  });
});
process.env.NODE_ENV !== "production" ? InnerOption.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  children: PropTypes.node,
  className: PropTypes.string,
  /**
   * If `true`, the option will be disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * A text representation of the option's content.
   * Used for keyboard text navigation matching.
   */
  label: PropTypes.string,
  /**
   * The props used for each slot inside the Option.
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The components used for each slot inside the Option.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType
  }),
  /**
   * The value of the option.
   */
  value: PropTypes.any.isRequired
} : void 0;
const InnerOptionMemo = /*#__PURE__*/React.memo(InnerOption);

/**
 * An unstyled option to be used within a Select.
 *
 * Demos:
 *
 * - [Select](https://mui.com/base-ui/react-select/)
 *
 * API:
 *
 * - [Option API](https://mui.com/base-ui/react-select/components-api/#option)
 */

const Option = /*#__PURE__*/React.forwardRef(function Option(props, ref) {
  const {
    value
  } = props;

  // This wrapper component is used as a performance optimization.
  // `useOptionContextStabilizer` ensures that the context value
  // is stable across renders, so that the actual Option re-renders
  // only when it needs to.
  const {
    contextValue
  } = useOptionContextStabilizer(value);
  return /*#__PURE__*/_jsx(ListContext.Provider, {
    value: contextValue,
    children: /*#__PURE__*/_jsx(InnerOptionMemo, {
      ...props,
      ref: ref
    })
  });
});
process.env.NODE_ENV !== "production" ? Option.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the option will be disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * A text representation of the option's content.
   * Used for keyboard text navigation matching.
   */
  label: PropTypes.string,
  /**
   * The props used for each slot inside the Option.
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The components used for each slot inside the Option.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType
  }),
  /**
   * The value of the option.
   */
  value: PropTypes.any.isRequired
} : void 0;
export { Option };