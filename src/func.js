module.exports = exports = {
  identity: function(d) {
    return d;
  },
  zero: function() {
    return 0;
  },
  nil: function() {
    return null;
  },
  permute: function(array, index) {
    for (var i = 0, n = index.length, copy = new Array(n); i < n; ++i) {
      copy[i] = array[index[i]];
    }
    return copy;
  },
  reduce: {
    increment: function(p) {
      return p + 1;
    },
    decrement: function(p) {
      return p - 1;
    },
    add: function(f) {
      return function(p, v) {
        return p + +f(v);
      };
    },
    subtract: function(f) {
      return function(p, v) {
        return p - f(v);
      };
    },
  },
  filter: {
    exact: function(bisect, value) {
      return function(values) {
        var n = values.length;
        return [bisect.left(values, value, 0, n), bisect.right(values, value, 0, n)];
      };
    },

    range: function(bisect, range) {
      var min = range[0],
          max = range[1];
      return function(values) {
        var n = values.length;
        return [bisect.left(values, min, 0, n), bisect.left(values, max, 0, n)];
      };
    },

    all: function(values) {
      return [0, values.length];
    },
  },
};

exports.bisect = function(f) {

  // Locate the insertion point for x in a to maintain sorted order. The
  // arguments lo and hi may be used to specify a subset of the array which
  // should be considered; by default the entire array is used. If x is already
  // present in a, the insertion point will be before (to the left of) any
  // existing entries. The return value is suitable for use as the first
  // argument to `array.splice` assuming that a is already sorted.
  //
  // The returned insertion point i partitions the array a into two halves so
  // that all v < x for v in a[lo:i] for the left side and all v >= x for v in
  // a[i:hi] for the right side.
  function bisectLeft(a, x, lo, hi) {
    while (lo < hi) {
      var mid = lo + hi >> 1;
      if (f(a[mid]) < x) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  }

  // Similar to bisectLeft, but returns an insertion point which comes after (to
  // the right of) any existing entries of x in a.
  //
  // The returned insertion point i partitions the array into two halves so that
  // all v <= x for v in a[lo:i] for the left side and all v > x for v in
  // a[i:hi] for the right side.
  function bisectRight(a, x, lo, hi) {
    while (lo < hi) {
      var mid = lo + hi >> 1;
      if (x < f(a[mid])) hi = mid;
      else lo = mid + 1;
    }
    return lo;
  }

  bisectRight.right = bisectRight;
  bisectRight.left = bisectLeft;
  return bisectRight;
};
