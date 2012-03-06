var tesseract_array8 = tesseract_arrayUntyped,
    tesseract_array16 = tesseract_arrayUntyped,
    tesseract_array32 = tesseract_arrayUntyped,
    tesseract_arrayLengthen = tesseract_identity,
    tesseract_arrayWiden = tesseract_identity;

if (typeof Uint8Array !== "undefined") {
  tesseract_array8 = function(n) { return new Uint8Array(n); };
  tesseract_array16 = function(n) { return new Uint16Array(n); };
  tesseract_array32 = function(n) { return new Uint32Array(n); };

  tesseract_arrayLengthen = function(array, length) {
    var copy = new array.constructor(length);
    copy.set(array);
    return copy;
  };

  tesseract_arrayWiden = function(array, width) {
    var copy;
    switch (width) {
      case 16: copy = tesseract_array16(array.length); break;
      case 32: copy = tesseract_array32(array.length); break;
      default: throw new Error("invalid array width!");
    }
    copy.set(array);
    return copy;
  };
}

function tesseract_arrayUntyped(n) {
  return new Array(n);
}
