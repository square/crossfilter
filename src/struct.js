var identity = require("./func").identity;

exports.heap = function(f) {

  // Builds a binary heap within the specified array a[lo:hi]. The heap has the
  // property such that the parent a[lo+i] is always less than or equal to its
  // two children: a[lo+2*i+1] and a[lo+2*i+2].
  function heap(a, lo, hi) {
    var n = hi - lo,
        i = (n >>> 1) + 1;
    while (--i > 0) sift(a, i, n, lo);
    return a;
  }

  // Sorts the specified array a[lo:hi] in descending order, assuming it is
  // already a heap.
  function sort(a, lo, hi) {
    var n = hi - lo,
        t;
    while (--n > 0) t = a[lo], a[lo] = a[lo + n], a[lo + n] = t, sift(a, 1, n, lo);
    return a;
  }

  // Sifts the element a[lo+i-1] down the heap, where the heap is the contiguous
  // slice of array a[lo:lo+n]. This method can also be used to update the heap
  // incrementally, without incurring the full cost of reconstructing the heap.
  function sift(a, i, n, lo) {
    var d = a[--lo + i],
        x = f(d),
        child;
    while ((child = i << 1) <= n) {
      if (child < n && f(a[lo + child]) > f(a[lo + child + 1])) child++;
      if (x <= f(a[lo + child])) break;
      a[lo + i] = a[lo + child];
      i = child;
    }
    a[lo + i] = d;
  }

  heap.sort = sort;
  return heap;
};


exports.heap.select = function(f) {
  var heap = exports.heap(f);

  // Returns a new array containing the top k elements in the array a[lo:hi].
  // The returned array is not sorted, but maintains the heap property. If k is
  // greater than hi - lo, then fewer than k elements will be returned. The
  // order of elements in a is unchanged by this operation.
  function heapselect(a, lo, hi, k) {
    var queue = new Array(k = Math.min(hi - lo, k)),
        min,
        i,
        x,
        d;

    for (i = 0; i < k; ++i) queue[i] = a[lo++];
    heap(queue, 0, k);

    if (lo < hi) {
      min = f(queue[0]);
      do {
        if (x = f(d = a[lo]) > min) {
          queue[0] = d;
          min = f(heap(queue, 0, k)[0]);
        }
      } while (++lo < hi);
    }

    return queue;
  }

  return heapselect;
};


exports.array8 = untypedArray;
exports.array16 = untypedArray;
exports.array32 = untypedArray;
exports.arrayLengthen = identity;
exports.arrayWiden = identity;

if (typeof Uint8Array !== "undefined") {
  exports.array8 = function(n) { return new Uint8Array(n); };
  exports.array16 = function(n) { return new Uint16Array(n); };
  exports.array32 = function(n) { return new Uint32Array(n); };

  exports.arrayLengthen = function(array, length) {
    var copy = new array.constructor(length);
    copy.set(array);
    return copy;
  };

  exports.arrayWiden = function(array, width) {
    var copy;
    switch (width) {
      case 16: copy = exports.array16(array.length); break;
      case 32: copy = exports.array32(array.length); break;
      default: throw new Error("invalid array width!");
    }
    copy.set(array);
    return copy;
  };
}

function untypedArray(n) {
  return new Array(n);
}
