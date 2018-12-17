import _values from 'lodash/values';
import _merge from 'lodash/merge';
import _keyBy from 'lodash/keyBy';

/**
 * Helper function to merge two objects with a same relation
 * @param {Object} source Source object to merge
 * @param {Object} other Other object to merge
 * @param {String} prop Property to merge with
 */
const mergeRelations = (source, other, prop) =>
  _values(_merge(_keyBy(source, prop), _keyBy(other, prop)));

// eslint-disable-next-line import/prefer-default-export
export { mergeRelations };