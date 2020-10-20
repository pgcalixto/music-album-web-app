/**
 * Checks if two Objects have equal field values.
 *
 * @param {Object} a - First object to be compared to.
 * @param {Object} b - Second object to be compared to.
 * @returns {Boolean} True if all Object's values are equal to each other,
 *                    false otherwise.
 */
export function isEquivalent(a, b) {
  if (a == null || b == null) {
    if (a == null && b == null) {
      return true;
    }
    return false;
  }
  var aProps = Object.getOwnPropertyNames(a);
  var bProps = Object.getOwnPropertyNames(b);
  if (aProps.length !== bProps.length) {
    return false;
  }
  for (var i = 0; i < aProps.length; i++) {
    var propName = aProps[i];
    if (a[propName] !== b[propName]) {
      return false;
    }
  }
  return true;
}
