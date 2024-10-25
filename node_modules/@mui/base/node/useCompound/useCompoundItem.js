"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCompoundItem = useCompoundItem;
var React = _interopRequireWildcard(require("react"));
var _utils = require("@mui/utils");
var _useCompoundParent = require("./useCompoundParent");
/**
 * Registers a child component with the parent component.
 *
 * @param id A unique key for the child component. If the `id` is `undefined`, the registration logic will not run (this can sometimes be the case during SSR).
 *   This can be either a value, or a function that generates a value based on already registered siblings' ids.
 *   If a function, it's called with the set of the ids of all the items that have already been registered.
 *   Return `existingKeys.size` if you want to use the index of the new item as the id.
 * @param itemMetadata Arbitrary metadata to pass to the parent component. This should be a stable reference (for example a memoized object), to avoid unnecessary re-registrations.
 *
 * @ignore - internal hook.
 */
function useCompoundItem(id, itemMetadata) {
  const context = React.useContext(_useCompoundParent.CompoundComponentContext);
  if (context === null) {
    throw new Error('useCompoundItem must be used within a useCompoundParent');
  }
  const {
    registerItem
  } = context;
  const [registeredId, setRegisteredId] = React.useState(typeof id === 'function' ? undefined : id);
  (0, _utils.unstable_useEnhancedEffect)(() => {
    const {
      id: returnedId,
      deregister
    } = registerItem(id, itemMetadata);
    setRegisteredId(returnedId);
    return deregister;
  }, [registerItem, itemMetadata, id]);
  return {
    id: registeredId,
    index: registeredId !== undefined ? context.getItemIndex(registeredId) : -1,
    totalItemCount: context.totalSubitemCount
  };
}