'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function isValidUrl(url) {
  return (/(ht|f)tp(s?):\/\/([^ \\/]*\.)+[^ \\/]*(:[0-9]+)?\/?/.test(url)
  );
}

/**
 * 深度对比两个对象是否一致
 * from: https://github.com/epoberezkin/fast-deep-equal
 * @param  {Object} a 对象a
 * @param  {Object} b 对象b
 * @return {Boolean}   是否相同
 */
/* eslint-disable */
function equal(a, b) {
  if (a === b) return true;

  if (a && b && (typeof a === 'undefined' ? 'undefined' : _typeof(a)) == 'object' && (typeof b === 'undefined' ? 'undefined' : _typeof(b)) == 'object') {
    var arrA = Array.isArray(a),
        arrB = Array.isArray(b),
        i,
        length,
        key;

    if (arrA && arrB) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;) {
        if (!equal(a[i], b[i])) return false;
      }return true;
    }

    if (arrA != arrB) return false;

    var dateA = a instanceof Date,
        dateB = b instanceof Date;
    if (dateA != dateB) return false;
    if (dateA && dateB) return a.getTime() == b.getTime();

    var regexpA = a instanceof RegExp,
        regexpB = b instanceof RegExp;
    if (regexpA != regexpB) return false;
    if (regexpA && regexpB) return a.toString() == b.toString();

    var keys = Object.keys(a);
    length = keys.length;

    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0;) {
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
    }for (i = length; i-- !== 0;) {
      key = keys[i];
      if (!equal(a[key], b[key])) return false;
    }

    return true;
  }

  return a !== a && b !== b;
}

module.exports = {
  isValidUrl: isValidUrl,
  equal: equal
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWwuanMiXSwibmFtZXMiOlsiaXNWYWxpZFVybCIsInVybCIsInRlc3QiLCJlcXVhbCIsImEiLCJiIiwiYXJyQSIsIkFycmF5IiwiaXNBcnJheSIsImFyckIiLCJpIiwibGVuZ3RoIiwia2V5IiwiZGF0ZUEiLCJEYXRlIiwiZGF0ZUIiLCJnZXRUaW1lIiwicmVnZXhwQSIsIlJlZ0V4cCIsInJlZ2V4cEIiLCJ0b1N0cmluZyIsImtleXMiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsU0FBU0EsVUFBVCxDQUFvQkMsR0FBcEIsRUFBeUI7QUFDdkIsU0FBTyx1REFBc0RDLElBQXRELENBQTJERCxHQUEzRDtBQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7QUFPQTtBQUNBLFNBQVNFLEtBQVQsQ0FBZUMsQ0FBZixFQUFrQkMsQ0FBbEIsRUFBcUI7QUFDbkIsTUFBSUQsTUFBTUMsQ0FBVixFQUFhLE9BQU8sSUFBUDs7QUFFYixNQUFJRCxLQUFLQyxDQUFMLElBQVUsUUFBT0QsQ0FBUCx5Q0FBT0EsQ0FBUCxNQUFZLFFBQXRCLElBQWtDLFFBQU9DLENBQVAseUNBQU9BLENBQVAsTUFBWSxRQUFsRCxFQUE0RDtBQUMxRCxRQUFJQyxPQUFPQyxNQUFNQyxPQUFOLENBQWNKLENBQWQsQ0FBWDtBQUFBLFFBQ0lLLE9BQU9GLE1BQU1DLE9BQU4sQ0FBY0gsQ0FBZCxDQURYO0FBQUEsUUFFSUssQ0FGSjtBQUFBLFFBR0lDLE1BSEo7QUFBQSxRQUlJQyxHQUpKOztBQU1BLFFBQUlOLFFBQVFHLElBQVosRUFBa0I7QUFDaEJFLGVBQVNQLEVBQUVPLE1BQVg7QUFDQSxVQUFJQSxVQUFVTixFQUFFTSxNQUFoQixFQUF3QixPQUFPLEtBQVA7QUFDeEIsV0FBS0QsSUFBSUMsTUFBVCxFQUFpQkQsUUFBUSxDQUF6QjtBQUNFLFlBQUksQ0FBQ1AsTUFBTUMsRUFBRU0sQ0FBRixDQUFOLEVBQVlMLEVBQUVLLENBQUYsQ0FBWixDQUFMLEVBQXdCLE9BQU8sS0FBUDtBQUQxQixPQUVBLE9BQU8sSUFBUDtBQUNEOztBQUVELFFBQUlKLFFBQVFHLElBQVosRUFBa0IsT0FBTyxLQUFQOztBQUVsQixRQUFJSSxRQUFRVCxhQUFhVSxJQUF6QjtBQUFBLFFBQ0lDLFFBQVFWLGFBQWFTLElBRHpCO0FBRUEsUUFBSUQsU0FBU0UsS0FBYixFQUFvQixPQUFPLEtBQVA7QUFDcEIsUUFBSUYsU0FBU0UsS0FBYixFQUFvQixPQUFPWCxFQUFFWSxPQUFGLE1BQWVYLEVBQUVXLE9BQUYsRUFBdEI7O0FBRXBCLFFBQUlDLFVBQVViLGFBQWFjLE1BQTNCO0FBQUEsUUFDSUMsVUFBVWQsYUFBYWEsTUFEM0I7QUFFQSxRQUFJRCxXQUFXRSxPQUFmLEVBQXdCLE9BQU8sS0FBUDtBQUN4QixRQUFJRixXQUFXRSxPQUFmLEVBQXdCLE9BQU9mLEVBQUVnQixRQUFGLE1BQWdCZixFQUFFZSxRQUFGLEVBQXZCOztBQUV4QixRQUFJQyxPQUFPQyxPQUFPRCxJQUFQLENBQVlqQixDQUFaLENBQVg7QUFDQU8sYUFBU1UsS0FBS1YsTUFBZDs7QUFFQSxRQUFJQSxXQUFXVyxPQUFPRCxJQUFQLENBQVloQixDQUFaLEVBQWVNLE1BQTlCLEVBQ0UsT0FBTyxLQUFQOztBQUVGLFNBQUtELElBQUlDLE1BQVQsRUFBaUJELFFBQVEsQ0FBekI7QUFDRSxVQUFJLENBQUNZLE9BQU9DLFNBQVAsQ0FBaUJDLGNBQWpCLENBQWdDQyxJQUFoQyxDQUFxQ3BCLENBQXJDLEVBQXdDZ0IsS0FBS1gsQ0FBTCxDQUF4QyxDQUFMLEVBQXVELE9BQU8sS0FBUDtBQUR6RCxLQUdBLEtBQUtBLElBQUlDLE1BQVQsRUFBaUJELFFBQVEsQ0FBekIsR0FBNkI7QUFDM0JFLFlBQU1TLEtBQUtYLENBQUwsQ0FBTjtBQUNBLFVBQUksQ0FBQ1AsTUFBTUMsRUFBRVEsR0FBRixDQUFOLEVBQWNQLEVBQUVPLEdBQUYsQ0FBZCxDQUFMLEVBQTRCLE9BQU8sS0FBUDtBQUM3Qjs7QUFFRCxXQUFPLElBQVA7QUFDRDs7QUFFRCxTQUFPUixNQUFJQSxDQUFKLElBQVNDLE1BQUlBLENBQXBCO0FBQ0Q7O0FBRURxQixPQUFPQyxPQUFQLEdBQWlCO0FBQ2YzQix3QkFEZTtBQUVmRztBQUZlLENBQWpCIiwiZmlsZSI6InV0aWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmZ1bmN0aW9uIGlzVmFsaWRVcmwodXJsKSB7XG4gIHJldHVybiAvKGh0fGYpdHAocz8pOlxcL1xcLyhbXiBcXFxcL10qXFwuKStbXiBcXFxcL10qKDpbMC05XSspP1xcLz8vLnRlc3QodXJsKTtcbn1cblxuLyoqXG4gKiDmt7Hluqblr7nmr5TkuKTkuKrlr7nosaHmmK/lkKbkuIDoh7RcbiAqIGZyb206IGh0dHBzOi8vZ2l0aHViLmNvbS9lcG9iZXJlemtpbi9mYXN0LWRlZXAtZXF1YWxcbiAqIEBwYXJhbSAge09iamVjdH0gYSDlr7nosaFhXG4gKiBAcGFyYW0gIHtPYmplY3R9IGIg5a+56LGhYlxuICogQHJldHVybiB7Qm9vbGVhbn0gICDmmK/lkKbnm7jlkIxcbiAqL1xuLyogZXNsaW50LWRpc2FibGUgKi9cbmZ1bmN0aW9uIGVxdWFsKGEsIGIpIHtcbiAgaWYgKGEgPT09IGIpIHJldHVybiB0cnVlO1xuXG4gIGlmIChhICYmIGIgJiYgdHlwZW9mIGEgPT0gJ29iamVjdCcgJiYgdHlwZW9mIGIgPT0gJ29iamVjdCcpIHtcbiAgICB2YXIgYXJyQSA9IEFycmF5LmlzQXJyYXkoYSlcbiAgICAgICwgYXJyQiA9IEFycmF5LmlzQXJyYXkoYilcbiAgICAgICwgaVxuICAgICAgLCBsZW5ndGhcbiAgICAgICwga2V5O1xuXG4gICAgaWYgKGFyckEgJiYgYXJyQikge1xuICAgICAgbGVuZ3RoID0gYS5sZW5ndGg7XG4gICAgICBpZiAobGVuZ3RoICE9IGIubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gICAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSAhPT0gMDspXG4gICAgICAgIGlmICghZXF1YWwoYVtpXSwgYltpXSkpIHJldHVybiBmYWxzZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmIChhcnJBICE9IGFyckIpIHJldHVybiBmYWxzZTtcblxuICAgIHZhciBkYXRlQSA9IGEgaW5zdGFuY2VvZiBEYXRlXG4gICAgICAsIGRhdGVCID0gYiBpbnN0YW5jZW9mIERhdGU7XG4gICAgaWYgKGRhdGVBICE9IGRhdGVCKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKGRhdGVBICYmIGRhdGVCKSByZXR1cm4gYS5nZXRUaW1lKCkgPT0gYi5nZXRUaW1lKCk7XG5cbiAgICB2YXIgcmVnZXhwQSA9IGEgaW5zdGFuY2VvZiBSZWdFeHBcbiAgICAgICwgcmVnZXhwQiA9IGIgaW5zdGFuY2VvZiBSZWdFeHA7XG4gICAgaWYgKHJlZ2V4cEEgIT0gcmVnZXhwQikgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChyZWdleHBBICYmIHJlZ2V4cEIpIHJldHVybiBhLnRvU3RyaW5nKCkgPT0gYi50b1N0cmluZygpO1xuXG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhhKTtcbiAgICBsZW5ndGggPSBrZXlzLmxlbmd0aDtcblxuICAgIGlmIChsZW5ndGggIT09IE9iamVjdC5rZXlzKGIpLmxlbmd0aClcbiAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tICE9PSAwOylcbiAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIGtleXNbaV0pKSByZXR1cm4gZmFsc2U7XG5cbiAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSAhPT0gMDspIHtcbiAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICBpZiAoIWVxdWFsKGFba2V5XSwgYltrZXldKSkgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIGEhPT1hICYmIGIhPT1iO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaXNWYWxpZFVybCxcbiAgZXF1YWxcbn07XG5cbiJdfQ==