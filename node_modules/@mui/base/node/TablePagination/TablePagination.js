"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TablePagination = void 0;
var _react = _interopRequireWildcard(require("react"));
var React = _react;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _utils = require("@mui/utils");
var _utils2 = require("../utils");
var _composeClasses = require("../composeClasses");
var _isHostComponent = require("../utils/isHostComponent");
var _TablePaginationActions = require("./TablePaginationActions");
var _tablePaginationClasses = require("./tablePaginationClasses");
var _ClassNameConfigurator = require("../utils/ClassNameConfigurator");
var _jsxRuntime = require("react/jsx-runtime");
function defaultLabelDisplayedRows({
  from,
  to,
  count
}) {
  return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
}
function defaultGetAriaLabel(type) {
  return `Go to ${type} page`;
}
const useUtilityClasses = () => {
  const slots = {
    root: ['root'],
    toolbar: ['toolbar'],
    spacer: ['spacer'],
    selectLabel: ['selectLabel'],
    select: ['select'],
    input: ['input'],
    selectIcon: ['selectIcon'],
    menuItem: ['menuItem'],
    displayedRows: ['displayedRows'],
    actions: ['actions']
  };
  return (0, _composeClasses.unstable_composeClasses)(slots, (0, _ClassNameConfigurator.useClassNamesOverride)(_tablePaginationClasses.getTablePaginationUtilityClass));
};

/**
 * A pagination for tables.
 *
 * Demos:
 *
 * - [Table Pagination](https://mui.com/base-ui/react-table-pagination/)
 *
 * API:
 *
 * - [TablePagination API](https://mui.com/base-ui/react-table-pagination/components-api/#table-pagination)
 */
const TablePagination = exports.TablePagination = /*#__PURE__*/React.forwardRef(function TablePagination(props, forwardedRef) {
  const {
    colSpan: colSpanProp,
    count,
    getItemAriaLabel = defaultGetAriaLabel,
    labelDisplayedRows = defaultLabelDisplayedRows,
    labelId: labelIdProp,
    labelRowsPerPage = 'Rows per page:',
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    rowsPerPageOptions = [10, 25, 50, 100],
    selectId: selectIdProp,
    slotProps = {},
    slots = {},
    ...other
  } = props;
  const ownerState = props;
  const classes = useUtilityClasses();
  let colSpan;
  const Root = slots.root ?? 'td';
  if (Root === 'td' || !(0, _isHostComponent.isHostComponent)(Root)) {
    colSpan = colSpanProp || 1000; // col-span over everything
  }
  const getLabelDisplayedRowsTo = () => {
    if (count === -1) {
      return (page + 1) * rowsPerPage;
    }
    return rowsPerPage === -1 ? count : Math.min(count, (page + 1) * rowsPerPage);
  };
  const selectId = (0, _utils.unstable_useId)(selectIdProp);
  const labelId = (0, _utils.unstable_useId)(labelIdProp);
  const rootProps = (0, _utils2.useSlotProps)({
    elementType: Root,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      colSpan,
      ref: forwardedRef
    },
    ownerState,
    className: classes.root
  });
  const Select = slots.select ?? 'select';
  const selectProps = (0, _utils2.useSlotProps)({
    elementType: Select,
    externalSlotProps: slotProps.select,
    additionalProps: {
      value: rowsPerPage,
      id: selectId,
      onChange: event => onRowsPerPageChange && onRowsPerPageChange(event),
      'aria-label': rowsPerPage.toString(),
      'aria-labelledby': [labelId, selectId].filter(Boolean).join(' ') || undefined
    },
    ownerState,
    className: classes.select
  });
  const Actions = slots.actions ?? _TablePaginationActions.TablePaginationActions;
  const actionsProps = (0, _utils2.useSlotProps)({
    elementType: Actions,
    externalSlotProps: slotProps.actions,
    additionalProps: {
      page,
      rowsPerPage,
      count,
      onPageChange,
      getItemAriaLabel
    },
    ownerState,
    className: classes.actions
  });
  const MenuItem = slots.menuItem ?? 'option';
  const menuItemProps = (0, _utils2.useSlotProps)({
    elementType: MenuItem,
    externalSlotProps: slotProps.menuItem,
    additionalProps: {
      value: undefined
    },
    ownerState,
    className: classes.menuItem
  });
  const SelectLabel = slots.selectLabel ?? 'p';
  const selectLabelProps = (0, _utils2.useSlotProps)({
    elementType: SelectLabel,
    externalSlotProps: slotProps.selectLabel,
    additionalProps: {
      id: labelId
    },
    ownerState,
    className: classes.selectLabel
  });
  const DisplayedRows = slots.displayedRows ?? 'p';
  const displayedRowsProps = (0, _utils2.useSlotProps)({
    elementType: DisplayedRows,
    externalSlotProps: slotProps.displayedRows,
    ownerState,
    className: classes.displayedRows
  });
  const Toolbar = slots.toolbar ?? 'div';
  const toolbarProps = (0, _utils2.useSlotProps)({
    elementType: Toolbar,
    externalSlotProps: slotProps.toolbar,
    ownerState,
    className: classes.toolbar
  });
  const Spacer = slots.spacer ?? 'div';
  const spacerProps = (0, _utils2.useSlotProps)({
    elementType: Spacer,
    externalSlotProps: slotProps.spacer,
    ownerState,
    className: classes.spacer
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(Root, {
    ...rootProps,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(Toolbar, {
      ...toolbarProps,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(Spacer, {
        ...spacerProps
      }), rowsPerPageOptions.length > 1 && /*#__PURE__*/(0, _jsxRuntime.jsx)(SelectLabel, {
        ...selectLabelProps,
        children: labelRowsPerPage
      }), rowsPerPageOptions.length > 1 && /*#__PURE__*/(0, _jsxRuntime.jsx)(Select, {
        ...selectProps,
        children: rowsPerPageOptions.map(rowsPerPageOption => /*#__PURE__*/(0, _react.createElement)(MenuItem, {
          ...menuItemProps,
          key: typeof rowsPerPageOption !== 'number' && rowsPerPageOption.label ? rowsPerPageOption.label : rowsPerPageOption,
          value: typeof rowsPerPageOption !== 'number' && rowsPerPageOption.value ? rowsPerPageOption.value : rowsPerPageOption
        }, typeof rowsPerPageOption !== 'number' && rowsPerPageOption.label ? rowsPerPageOption.label : rowsPerPageOption))
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(DisplayedRows, {
        ...displayedRowsProps,
        children: labelDisplayedRows({
          from: count === 0 ? 0 : page * rowsPerPage + 1,
          to: getLabelDisplayedRowsTo(),
          count: count === -1 ? -1 : count,
          page
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Actions, {
        ...actionsProps
      })]
    })
  });
});
process.env.NODE_ENV !== "production" ? TablePagination.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  colSpan: _propTypes.default.number,
  /**
   * The total number of rows.
   *
   * To enable server side pagination for an unknown number of items, provide -1.
   */
  count: _propTypes.default.number.isRequired,
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current page.
   * This is important for screen reader users.
   *
   * For localization purposes, you can use the provided [translations](https://mui.com/material-ui/guides/localization/).
   * @param {string} type The link or button type to format ('first' | 'last' | 'next' | 'previous').
   * @returns {string}
   * @default function defaultGetAriaLabel(type: ItemAriaLabelType) {
   *   return `Go to ${type} page`;
   * }
   */
  getItemAriaLabel: _propTypes.default.func,
  /**
   * Customize the displayed rows label. Invoked with a `{ from, to, count, page }`
   * object.
   *
   * For localization purposes, you can use the provided [translations](https://mui.com/material-ui/guides/localization/).
   * @default function defaultLabelDisplayedRows({ from, to, count }: LabelDisplayedRowsArgs) {
   *   return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
   * }
   */
  labelDisplayedRows: _propTypes.default.func,
  /**
   * Id of the label element within the pagination.
   */
  labelId: _propTypes.default.string,
  /**
   * Customize the rows per page label.
   *
   * For localization purposes, you can use the provided [translations](https://mui.com/material-ui/guides/localization/).
   * @default 'Rows per page:'
   */
  labelRowsPerPage: _propTypes.default.node,
  /**
   * Callback fired when the page is changed.
   *
   * @param {React.MouseEvent<HTMLButtonElement> | null} event The event source of the callback.
   * @param {number} page The page selected.
   */
  onPageChange: _propTypes.default.func.isRequired,
  /**
   * Callback fired when the number of rows per page is changed.
   *
   * @param {React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>} event The event source of the callback.
   */
  onRowsPerPageChange: _propTypes.default.func,
  /**
   * The zero-based index of the current page.
   */
  page: (0, _utils.chainPropTypes)(_utils.integerPropType.isRequired, props => {
    const {
      count,
      page,
      rowsPerPage
    } = props;
    if (count === -1) {
      return null;
    }
    const newLastPage = Math.max(0, Math.ceil(count / rowsPerPage) - 1);
    if (page < 0 || page > newLastPage) {
      return new Error('MUI: The page prop of a TablePagination is out of range ' + `(0 to ${newLastPage}, but page is ${page}).`);
    }
    return null;
  }),
  /**
   * The number of rows per page.
   *
   * Set -1 to display all the rows.
   */
  rowsPerPage: _utils.integerPropType.isRequired,
  /**
   * Customizes the options of the rows per page select field. If less than two options are
   * available, no select field will be displayed.
   * Use -1 for the value with a custom label to show all the rows.
   * @default [10, 25, 50, 100]
   */
  rowsPerPageOptions: _propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.shape({
    label: _propTypes.default.string.isRequired,
    value: _propTypes.default.number.isRequired
  })]).isRequired),
  /**
   * Id of the select element within the pagination.
   */
  selectId: _propTypes.default.string,
  /**
   * The props used for each slot inside the TablePagination.
   * @default {}
   */
  slotProps: _propTypes.default /* @typescript-to-proptypes-ignore */.shape({
    actions: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
    displayedRows: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
    menuItem: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
    root: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
    select: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
    selectLabel: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
    spacer: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
    toolbar: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object])
  }),
  /**
   * The components used for each slot inside the TablePagination.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: _propTypes.default.shape({
    actions: _propTypes.default.elementType,
    displayedRows: _propTypes.default.elementType,
    menuItem: _propTypes.default.elementType,
    root: _propTypes.default.elementType,
    select: _propTypes.default.elementType,
    selectLabel: _propTypes.default.elementType,
    spacer: _propTypes.default.elementType,
    toolbar: _propTypes.default.elementType
  })
} : void 0;