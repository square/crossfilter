var crossfilter_identity = require("./identity");

exports.crossfilter_array8 = crossfilter_arrayUntyped;
exports.crossfilter_array16 = crossfilter_arrayUntyped;
exports.crossfilter_array32 = crossfilter_arrayUntyped;
exports.crossfilter_arrayLengthen = crossfilter_identity;
exports.crossfilter_arrayWiden = crossfilter_identity;

if (typeof Uint8Array !== "undefined") {
  exports.crossfilter_array8 = function(n) { return new Uint8Array(n); };
  exports.crossfilter_array16 = function(n) { return new Uint16Array(n); };
  exports.crossfilter_array32 = function(n) { return new Uint32Array(n); };

  exports.crossfilter_arrayLengthen = function(array, length) {
    var copy = new array.constructor(length);
    copy.set(array);
    return copy;
  };

  exports.crossfilter_arrayWiden = function(array, width) {
    var copy;
    switch (width) {
      case 16: copy = exports.crossfilter_array16(array.length); break;
      case 32: copy = exports.crossfilter_array32(array.length); break;
      default: throw new Error("invalid array width!");
    }
    copy.set(array);
    return copy;
  };
}

function crossfilter_arrayUntyped(n) {
  return new Array(n);
}
