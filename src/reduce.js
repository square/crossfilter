function tesseract_reduceIncrement(p) {
  return p + 1;
}

function tesseract_reduceDecrement(p) {
  return p - 1;
}

function tesseract_reduceAdd(f) {
  return function(p, v) {
    return p + +f(v);
  };
}

function tesseract_reduceSubtract(f) {
  return function(p, v) {
    return p - f(v);
  };
}
