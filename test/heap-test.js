var vows = require("vows"),
    assert = require("assert"),
    crossfilter = require("../");

var suite = vows.describe("heap");

suite.addBatch({
  "heap": {
    topic: function() {
      return crossfilter.heap;
    },
    "children are greater than or equal to parents": function(heap) {
      var array = [6, 5, 3, 1, 8, 7, 2, 4]
          n = array.length;
      assert.strictEqual(heap(array, 0, n), array);
      assert.equal(array[0], 1);
      for (var i = 1; i < n; ++i) assert(array[i] >= array[i - 1 >> 1]);
    },
    "creates a heap from a subset of the array": function(heap) {
      var array = [6, 5, 3, 1, 8, 7, 2, 4]
          n = 6;
      assert.strictEqual(heap(array, 0, n), array);
      assert.equal(array[0], 1);
      for (var i = 1; i < n; ++i) assert(array[i] >= array[i - 1 >> 1]);
    },

    "sort": {
      "sorts an existing heap in descending order": function(heap) {
        var array = [1, 4, 2, 5, 8, 7, 3, 6],
            n = array.length;
        heap.sort(array, 0, n);
        assert.deepEqual(array, [8, 7, 6, 5, 4, 3, 2, 1]);
      },
      "sorts a two-element heap in descending order": function(heap) {
        var array = [1, 4],
            n = array.length;
        heap.sort(array, 0, n);
        assert.deepEqual(array, [4, 1]);
      }
    }
  }
});

suite.export(module);
