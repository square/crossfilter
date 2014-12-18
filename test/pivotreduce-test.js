
var vows = require("vows"),
    assert = require("assert"),
    d3 = require("d3"),
    crossfilter = require("../");

var suite = vows.describe("crossfilter_pivot");

suite.addBatch({
  "crossfilter_pivot": {
    topic: function() {
      var data = crossfilter([
        {id: 1, date: "2011-11-14T16:17:54Z", place: 2, type: "tab", value: 2},
        {id: 1, date: "2011-11-14T16:20:19Z", place: 1, type: "tab", value: 5},
        {id: 2, date: "2011-11-14T16:28:54Z", place: 1, type: "visa", value: 1},
        {id: 2, date: "2011-11-14T16:30:43Z", place: 2, type: "tab", value: 1},
        {id: 3, date: "2011-11-14T16:48:46Z", place: 2, type: "tab", value: 2}
      ]);

      // be sure you don't clobber a built-in method if you do this!
      try {
        data.id = data.dimension(function(d) { return d.id; });
        data.place = data.dimension(function(d) { return d.place; });
        data.date = data.dimension(function(d) { return new Date(d.date); });
        data.type = data.dimension(function(d) { return d.type; });
      } catch (e) {
        console.log(e.stack);
      }

      return data;
    },
        "pivotReduceCount": {
          "reduces by count": function(data) {
            data.quantity.count.reduceSum(function(d) { return d.total; });
            console.log("test antonio");
            assert.strictEqual(data.quantity.count.value(), 6660);
            data.quantity.count.reduceCount();
            assert.strictEqual(data.quantity.count.value(), 43);
          }
        },

        "reduceSum": {
          "reduces by sum of accessor function": function(data) {
            try {
              data.quantity.count.reduceSum(function(d) { return d.total; });
              assert.strictEqual(data.quantity.count.value(), 6660);
              data.quantity.count.reduceSum(function() { return 1; });
              assert.strictEqual(data.quantity.count.value(), 43);
            } finally {
              data.quantity.count.reduceCount();
            }
          }
        }

});

function key(d) {
  return d.key;
}

suite.export(module);
