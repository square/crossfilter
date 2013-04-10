var vows = require("vows"),
    assert = require("assert"),
    crossfilter = require("../");

var suite = vows.describe("sort");

suite.addBatch({
  "insertionsort": batch(crossfilter.insertionsort),
  "quicksort": batch(crossfilter.quicksort, {
    "can sort a largeish Uint32Array quickly": function(sort) {
      var n = 1e6,
          typedArray = new Uint32Array(n),
          start,
          duration;
      for (var i = 0; i < n; i++) typedArray[i] = Math.random() * (1 << 30) | 0;
      start = Date.now();
      sort(typedArray, 0, n);
      duration = Date.now() - start;
      assert.lesser(duration, 600);
      for (var i = 1; i < n; i++) assert(typedArray[i - 1] <= typedArray[i]);
    }
  })
});

function batch(sort, extras) {
  var batch = {
    topic: function() {
      return sort;
    },
    "can sort a small array of positive integers": function(sort) {
      var array = [6, 5, 3, 1, 8, 7, 2, 4];
      assert.strictEqual(sort(array, 0, array.length), array);
      assert.deepEqual(array, [1, 2, 3, 4, 5, 6, 7, 8]);
    },
    "can sort a subset of a small array of positive integers": function(sort) {
      var array = [6, 5, 3, 1, 8, 7, 2, 4];
      assert.strictEqual(sort(array, 0, 4), array);
      assert.deepEqual(array, [1, 3, 5, 6, 8, 7, 2, 4]);
      assert.strictEqual(sort(array, 4, 8), array);
      assert.deepEqual(array, [1, 3, 5, 6, 2, 4, 7, 8]);
    },
    "can sort a small array of strings": function(sort) {
      var array = ["1", "2", "10"];
      assert.strictEqual(sort(array, 0, array.length), array);
      assert.deepEqual(array, ["1", "10", "2"]);
    },
    "can sort a small array of objects using an accessor": function(sort) {
      var array = [{value: 6}, {value: 1}, {value: 3}, {value: 8}];
      assert.strictEqual(sort.by(function(d) { return d.value; })(array, 0, array.length), array);
      assert.deepEqual(array, [{value: 1}, {value: 3}, {value: 6}, {value: 8}]);
    },
    "can sort a small Int32Array": function(sort) {
      var n = 17,
          typedArray = new Int32Array(n),
          untypedArray = new Array(n),
          untypedActual = new Array(n);
      for (var i = 0; i < n; i++) typedArray[i] = untypedArray[i] = Math.random() * (1 << 31) | 0;
      assert.strictEqual(sort(typedArray, 0, n), typedArray);
      assert.strictEqual(untypedArray.sort(ascending), untypedArray);
      for (var i = 0; i < n; i++) untypedActual[i] = typedArray[i];
      assert.deepEqual(untypedActual, untypedArray);
    },
    "can sort a smallish Float64Array": function(sort) {
      var n = 1e4,
          typedArray = new Float64Array(n),
          untypedArray = new Array(n),
          untypedActual = new Array(n);
      for (var i = 0; i < n; i++) typedArray[i] = untypedArray[i] = Math.random();
      assert.strictEqual(sort(typedArray, 0, n), typedArray);
      assert.strictEqual(untypedArray.sort(ascending), untypedArray);
      for (var i = 0; i < n; i++) untypedActual[i] = typedArray[i];
      assert.deepEqual(untypedActual, untypedArray);
    }
  };
  for (var key in extras) batch[key] = extras[key];
  return batch;
}

function ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
}

suite.export(module);
