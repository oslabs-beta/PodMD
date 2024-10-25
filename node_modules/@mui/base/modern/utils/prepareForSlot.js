import * as React from 'react';
export function prepareForSlot(Component) {
  return /*#__PURE__*/React.forwardRef(function Slot(props, ref) {
    const {
      ownerState,
      ...other
    } = props;
    return /*#__PURE__*/React.createElement(Component, {
      ...other,
      ref
    });
  });
}