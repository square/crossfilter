var vows = require("vows"),
    assert = require("assert"),
    crossfilter = require("../");

var suite = vows.describe("select");

suite.addBatch({
  "heapselect": batch(crossfilter.heapselect)
});

function batch(select, extras) {
  var batch = {
    topic: function() {
      return select;
    },
    "can select from a small array of positive integers": function(select) {
      var array = [6, 5, 3, 1, 8, 7, 2, 4];
      assert.deepEqual(select(array, 0, array.length, 1), [8]);
      assert.deepEqual(select(array, 0, array.length, 2).sort(descending), [8, 7]);
      assert.deepEqual(select(array, 0, array.length, 3).sort(descending), [8, 7, 6]);
      assert.deepEqual(select(array, 0, array.length, 4).sort(descending), [8, 7, 6, 5]);
      assert.deepEqual(select(array, 0, array.length, 5).sort(descending), [8, 7, 6, 5, 4]);
      assert.deepEqual(select(array, 0, array.length, 6).sort(descending), [8, 7, 6, 5, 4, 3]);
      assert.deepEqual(select(array, 0, array.length, 7).sort(descending), [8, 7, 6, 5, 4, 3, 2]);
      assert.deepEqual(select(array, 0, array.length, 8).sort(descending), [8, 7, 6, 5, 4, 3, 2, 1]);
    },
    "does not affect the original order; returns a copy": function(select) {
      var array = [6, 5, 3, 1, 8, 7, 2, 4];
      select(array, 0, array.length, 4);
      assert.deepEqual(array, [6, 5, 3, 1, 8, 7, 2, 4]);
    },
    "returns fewer than k elements when k is too big": function(select) {
      var array = [6, 5, 3, 1, 8, 7, 2, 4];
      assert.deepEqual(select(array, 0, array.length, 8).sort(descending), [8, 7, 6, 5, 4, 3, 2, 1]);
    },
    "returns an empty array when selecting nothing": function(select) {
      var array = [];
      select = select.by(function(d) { return d.value; });
      assert.deepEqual(select(array, 0, array.length, 1), []);
    },
    "the returned array is a binary heap": function(select) {
      var array = [6, 5, 3, 1, 8, 7, 2, 4];
      for (var i = 0; i < 10; ++i) assert(heapy(select(array, 0, array.length, i)), array + "");
    }
  };
  for (var key in extras) batch[key] = extras[key];
  return batch;
}

function descending(a, b) {
  return a > b ? -1 : a < b ? 1 : 0;
}

function heapy(array) {
  var n = array.length;
  for (var i = 1; i < n; ++i) {
    if (array[i] < array[i - 1 >> 1]) {
      return false;
    }
  }
  return true;
}

suite.export(module);
