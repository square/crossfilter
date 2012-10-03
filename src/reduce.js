exports.crossfilter_reduceIncrement = function(p) {
  return p + 1;
}

exports.crossfilter_reduceDecrement = function(p) {
  return p - 1;
}

exports.crossfilter_reduceAdd = function(f) {
  return function(p, v) {
    return p + +f(v);
  };
}

exports.crossfilter_reduceSubtract = function(f) {
  return function(p, v) {
    return p - f(v);
  };
}
