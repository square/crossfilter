var vows = require("vows"),
    assert = require("assert"),
    crossfilter = require("../");

var suite = vows.describe("bisect");

suite.addBatch({
  "bisect": {
    topic: function() {
      return crossfilter.bisect;
    },
    "is the same as bisect.right": function(bisect) {
      assert.strictEqual(bisect, bisect.right);
    }
  }
});

suite.addBatch({
  "bisect.left": {
    topic: function() {
      return crossfilter.bisect.left;
    },
    "finds the index of an exact match": function(bisect) {
      var array = [1, 2, 3];
      assert.equal(bisect(array, 1, 0, 3), 0);
      assert.equal(bisect(array, 2, 0, 3), 1);
      assert.equal(bisect(array, 3, 0, 3), 2);
    },
    "finds the index of the first match": function(bisect) {
      var array = [1, 2, 2, 3];
      assert.equal(bisect(array, 1, 0, 4), 0);
      assert.equal(bisect(array, 2, 0, 4), 1);
      assert.equal(bisect(array, 3, 0, 4), 3);
    },
    "finds the insertion point of a non-exact match": function(bisect) {
      var array = [1, 2, 3];
      assert.equal(bisect(array, 0.5, 0, 3), 0);
      assert.equal(bisect(array, 1.5, 0, 3), 1);
      assert.equal(bisect(array, 2.5, 0, 3), 2);
      assert.equal(bisect(array, 3.5, 0, 3), 3);
    },
    "observes the lower bound": function(bisect) {
      var array = [1, 2, 3, 4, 5];
      assert.equal(bisect(array, 0, 2, 5), 2);
      assert.equal(bisect(array, 1, 2, 5), 2);
      assert.equal(bisect(array, 2, 2, 5), 2);
      assert.equal(bisect(array, 3, 2, 5), 2);
      assert.equal(bisect(array, 4, 2, 5), 3);
      assert.equal(bisect(array, 5, 2, 5), 4);
      assert.equal(bisect(array, 6, 2, 5), 5);
    },
    "observes the lower and upper bounds": function(bisect) {
      var array = [1, 2, 3, 4, 5];
      assert.equal(bisect(array, 0, 2, 3), 2);
      assert.equal(bisect(array, 1, 2, 3), 2);
      assert.equal(bisect(array, 2, 2, 3), 2);
      assert.equal(bisect(array, 3, 2, 3), 2);
      assert.equal(bisect(array, 4, 2, 3), 3);
      assert.equal(bisect(array, 5, 2, 3), 3);
      assert.equal(bisect(array, 6, 2, 3), 3);
    },
    "large arrays": function(bisect) {
      var array = [],
          i = 1 << 30;
      array[i++] = 1;
      array[i++] = 2;
      array[i++] = 3;
      array[i++] = 4;
      array[i++] = 5;
      assert.equal(bisect(array, 0, i - 5, i), i - 5);
      assert.equal(bisect(array, 1, i - 5, i), i - 5);
      assert.equal(bisect(array, 2, i - 5, i), i - 4);
      assert.equal(bisect(array, 3, i - 5, i), i - 3);
      assert.equal(bisect(array, 4, i - 5, i), i - 2);
      assert.equal(bisect(array, 5, i - 5, i), i - 1);
      assert.equal(bisect(array, 6, i - 5, i), i - 0);
    }
  }
});

suite.addBatch({
  "bisect.by(value).left": {
    topic: function() {
      return crossfilter.bisect.by(function(d) { return d.value; }).left;
    },
    "finds the index of an exact match": function(bisect) {
      var array = [{value: 1}, {value: 2}, {value: 3}];
      assert.equal(bisect(array, 1, 0, 3), 0);
      assert.equal(bisect(array, 2, 0, 3), 1);
      assert.equal(bisect(array, 3, 0, 3), 2);
    },
    "finds the index of the first match": function(bisect) {
      var array = [{value: 1}, {value: 2}, {value: 2}, {value: 3}];
      assert.equal(bisect(array, 1, 0, 4), 0);
      assert.equal(bisect(array, 2, 0, 4), 1);
      assert.equal(bisect(array, 3, 0, 4), 3);
    },
    "finds the insertion point of a non-exact match": function(bisect) {
      var array = [{value: 1}, {value: 2}, {value: 3}];
      assert.equal(bisect(array, 0.5, 0, 3), 0);
      assert.equal(bisect(array, 1.5, 0, 3), 1);
      assert.equal(bisect(array, 2.5, 0, 3), 2);
      assert.equal(bisect(array, 3.5, 0, 3), 3);
    },
    "observes the lower bound": function(bisect) {
      var array = [{value: 1}, {value: 2}, {value: 3}, {value: 4}, {value: 5}];
      assert.equal(bisect(array, 0, 2, 5), 2);
      assert.equal(bisect(array, 1, 2, 5), 2);
      assert.equal(bisect(array, 2, 2, 5), 2);
      assert.equal(bisect(array, 3, 2, 5), 2);
      assert.equal(bisect(array, 4, 2, 5), 3);
      assert.equal(bisect(array, 5, 2, 5), 4);
      assert.equal(bisect(array, 6, 2, 5), 5);
    },
    "observes the lower and upper bounds": function(bisect) {
      var array = [{value: 1}, {value: 2}, {value: 3}, {value: 4}, {value: 5}];
      assert.equal(bisect(array, 0, 2, 3), 2);
      assert.equal(bisect(array, 1, 2, 3), 2);
      assert.equal(bisect(array, 2, 2, 3), 2);
      assert.equal(bisect(array, 3, 2, 3), 2);
      assert.equal(bisect(array, 4, 2, 3), 3);
      assert.equal(bisect(array, 5, 2, 3), 3);
      assert.equal(bisect(array, 6, 2, 3), 3);
    },
    "large arrays": function(bisect) {
      var array = [],
          i = 1 << 30;
      array[i++] = {value: 1};
      array[i++] = {value: 2};
      array[i++] = {value: 3};
      array[i++] = {value: 4};
      array[i++] = {value: 5};
      assert.equal(bisect(array, 0, i - 5, i), i - 5);
      assert.equal(bisect(array, 1, i - 5, i), i - 5);
      assert.equal(bisect(array, 2, i - 5, i), i - 4);
      assert.equal(bisect(array, 3, i - 5, i), i - 3);
      assert.equal(bisect(array, 4, i - 5, i), i - 2);
      assert.equal(bisect(array, 5, i - 5, i), i - 1);
      assert.equal(bisect(array, 6, i - 5, i), i - 0);
    }
  }
});

suite.addBatch({
  "bisect.right": {
    topic: function() {
      return crossfilter.bisect.right;
    },
    "finds the index after an exact match": function(bisect) {
      var array = [1, 2, 3];
      assert.equal(bisect(array, 1, 0, 3), 1);
      assert.equal(bisect(array, 2, 0, 3), 2);
      assert.equal(bisect(array, 3, 0, 3), 3);
    },
    "finds the index after the last match": function(bisect) {
      var array = [1, 2, 2, 3];
      assert.equal(bisect(array, 1, 0, 4), 1);
      assert.equal(bisect(array, 2, 0, 4), 3);
      assert.equal(bisect(array, 3, 0, 4), 4);
    },
    "finds the insertion point of a non-exact match": function(bisect) {
      var array = [1, 2, 3];
      assert.equal(bisect(array, 0.5, 0, 3), 0);
      assert.equal(bisect(array, 1.5, 0, 3), 1);
      assert.equal(bisect(array, 2.5, 0, 3), 2);
      assert.equal(bisect(array, 3.5, 0, 3), 3);
    },
    "observes the lower bound": function(bisect) {
      var array = [1, 2, 3, 4, 5];
      assert.equal(bisect(array, 0, 2, 5), 2);
      assert.equal(bisect(array, 1, 2, 5), 2);
      assert.equal(bisect(array, 2, 2, 5), 2);
      assert.equal(bisect(array, 3, 2, 5), 3);
      assert.equal(bisect(array, 4, 2, 5), 4);
      assert.equal(bisect(array, 5, 2, 5), 5);
      assert.equal(bisect(array, 6, 2, 5), 5);
    },
    "observes the lower and upper bounds": function(bisect) {
      var array = [1, 2, 3, 4, 5];
      assert.equal(bisect(array, 0, 2, 3), 2);
      assert.equal(bisect(array, 1, 2, 3), 2);
      assert.equal(bisect(array, 2, 2, 3), 2);
      assert.equal(bisect(array, 3, 2, 3), 3);
      assert.equal(bisect(array, 4, 2, 3), 3);
      assert.equal(bisect(array, 5, 2, 3), 3);
      assert.equal(bisect(array, 6, 2, 3), 3);
    },
    "large arrays": function(bisect) {
      var array = [],
          i = 1 << 30;
      array[i++] = 1;
      array[i++] = 2;
      array[i++] = 3;
      array[i++] = 4;
      array[i++] = 5;
      assert.equal(bisect(array, 0, i - 5, i), i - 5);
      assert.equal(bisect(array, 1, i - 5, i), i - 4);
      assert.equal(bisect(array, 2, i - 5, i), i - 3);
      assert.equal(bisect(array, 3, i - 5, i), i - 2);
      assert.equal(bisect(array, 4, i - 5, i), i - 1);
      assert.equal(bisect(array, 5, i - 5, i), i - 0);
      assert.equal(bisect(array, 6, i - 5, i), i - 0);
    }
  }
});

suite.addBatch({
  "bisect.by(value).right": {
    topic: function() {
      return crossfilter.bisect.by(function(d) { return d.value; }).right;
    },
    "finds the index after an exact match": function(bisect) {
      var array = [{value: 1}, {value: 2}, {value: 3}];
      assert.equal(bisect(array, 1, 0, 3), 1);
      assert.equal(bisect(array, 2, 0, 3), 2);
      assert.equal(bisect(array, 3, 0, 3), 3);
    },
    "finds the index after the last match": function(bisect) {
      var array = [{value: 1}, {value: 2}, {value: 2}, {value: 3}];
      assert.equal(bisect(array, 1, 0, 4), 1);
      assert.equal(bisect(array, 2, 0, 4), 3);
      assert.equal(bisect(array, 3, 0, 4), 4);
    },
    "finds the insertion point of a non-exact match": function(bisect) {
      var array = [{value: 1}, {value: 2}, {value: 3}];
      assert.equal(bisect(array, 0.5, 0, 3), 0);
      assert.equal(bisect(array, 1.5, 0, 3), 1);
      assert.equal(bisect(array, 2.5, 0, 3), 2);
      assert.equal(bisect(array, 3.5, 0, 3), 3);
    },
    "observes the lower bound": function(bisect) {
      var array = [{value: 1}, {value: 2}, {value: 3}, {value: 4}, {value: 5}];
      assert.equal(bisect(array, 0, 2, 5), 2);
      assert.equal(bisect(array, 1, 2, 5), 2);
      assert.equal(bisect(array, 2, 2, 5), 2);
      assert.equal(bisect(array, 3, 2, 5), 3);
      assert.equal(bisect(array, 4, 2, 5), 4);
      assert.equal(bisect(array, 5, 2, 5), 5);
      assert.equal(bisect(array, 6, 2, 5), 5);
    },
    "observes the lower and upper bounds": function(bisect) {
      var array = [{value: 1}, {value: 2}, {value: 3}, {value: 4}, {value: 5}];
      assert.equal(bisect(array, 0, 2, 3), 2);
      assert.equal(bisect(array, 1, 2, 3), 2);
      assert.equal(bisect(array, 2, 2, 3), 2);
      assert.equal(bisect(array, 3, 2, 3), 3);
      assert.equal(bisect(array, 4, 2, 3), 3);
      assert.equal(bisect(array, 5, 2, 3), 3);
      assert.equal(bisect(array, 6, 2, 3), 3);
    },
    "large arrays": function(bisect) {
      var array = [],
          i = 1 << 30;
      array[i++] = {value: 1};
      array[i++] = {value: 2};
      array[i++] = {value: 3};
      array[i++] = {value: 4};
      array[i++] = {value: 5};
      assert.equal(bisect(array, 0, i - 5, i), i - 5);
      assert.equal(bisect(array, 1, i - 5, i), i - 4);
      assert.equal(bisect(array, 2, i - 5, i), i - 3);
      assert.equal(bisect(array, 3, i - 5, i), i - 2);
      assert.equal(bisect(array, 4, i - 5, i), i - 1);
      assert.equal(bisect(array, 5, i - 5, i), i - 0);
      assert.equal(bisect(array, 6, i - 5, i), i - 0);
    }
  }
});

suite.export(module);
