var vows = require("vows"),
    assert = require("assert"),
    d3 = require("d3"),
    crossfilter = require("../");

var suite = vows.describe("crossfilter");

suite.addBatch({
  "crossfilter": {
    topic: function() {
      var data = crossfilter([
        {date: "2011-11-14T16:17:54Z", quantity: 2, total: 190, tip: 100, type: "tab"},
        {date: "2011-11-14T16:20:19Z", quantity: 2, total: 190, tip: 100, type: "tab"},
        {date: "2011-11-14T16:28:54Z", quantity: 1, total: 300, tip: 200, type: "visa"},
        {date: "2011-11-14T16:30:43Z", quantity: 2, total: 90, tip: 0, type: "tab"},
        {date: "2011-11-14T16:48:46Z", quantity: 2, total: 90, tip: 0, type: "tab"},
        {date: "2011-11-14T16:53:41Z", quantity: 2, total: 90, tip: 0, type: "tab"},
        {date: "2011-11-14T16:54:06Z", quantity: 1, total: 100, tip: null, type: "cash"},
        {date: "2011-11-14T17:02:03Z", quantity: 2, total: 90, tip: 0, type: "tab"},
        {date: "2011-11-14T17:07:21Z", quantity: 2, total: 90, tip: 0, type: "tab"},
        {date: "2011-11-14T17:22:59Z", quantity: 2, total: 90, tip: 0, type: "tab"},
        {date: "2011-11-14T17:25:45Z", quantity: 2, total: 200, tip: null, type: "cash"},
        {date: "2011-11-14T17:29:52Z", quantity: 1, total: 200, tip: 100, type: "visa"},
        {date: "2011-11-14T17:33:46Z", quantity: 2, total: 190, tip: 100, type: "tab"},
        {date: "2011-11-14T17:33:59Z", quantity: 2, total: 90, tip: 0, type: "tab"},
        {date: "2011-11-14T17:38:40Z", quantity: 2, total: 200, tip: 100, type: "visa"},
        {date: "2011-11-14T17:52:02Z", quantity: 2, total: 90, tip: 0, type: "tab"},
        {date: "2011-11-14T18:02:42Z", quantity: 2, total: 190, tip: 100, type: "tab"},
        {date: "2011-11-14T18:02:51Z", quantity: 2, total: 190, tip: 100, type: "tab"},
        {date: "2011-11-14T18:12:54Z", quantity: 1, total: 200, tip: 100, type: "visa"},
        {date: "2011-11-14T18:14:53Z", quantity: 2, total: 100, tip: null, type: "cash"},
        {date: "2011-11-14T18:45:24Z", quantity: 2, total: 90, tip: 0, type: "tab"},
        {date: "2011-11-14T19:00:31Z", quantity: 2, total: 190, tip: 100, type: "tab"},
        {date: "2011-11-14T19:04:22Z", quantity: 2, total: 90, tip: 0, type: "tab"},
        {date: "2011-11-14T19:30:44Z", quantity: 2, total: 90, tip: 0, type: "tab"},
        {date: "2011-11-14T20:06:33Z", quantity: 1, total: 100, tip: null, type: "cash"},
        {date: "2011-11-14T20:49:07Z", quantity: 2, total: 290, tip: 200, type: "tab"},
        {date: "2011-11-14T21:05:36Z", quantity: 2, total: 90, tip: 0, type: "tab"},
        {date: "2011-11-14T21:18:48Z", quantity: 4, total: 270, tip: 0, type: "tab"},
        {date: "2011-11-14T21:22:31Z", quantity: 1, total: 200, tip: 100, type: "visa"},
        {date: "2011-11-14T21:26:30Z", quantity: 2, total: 190, tip: 100, type: "tab"},
        {date: "2011-11-14T21:30:55Z", quantity: 2, total: 190, tip: 100, type: "tab"},
        {date: "2011-11-14T21:31:05Z", quantity: 2, total: 90, tip: 0, type: "tab"},
        {date: "2011-11-14T22:30:22Z", quantity: 2, total: 89, tip: 0, type: "tab"},
        {date: "2011-11-14T22:34:28Z", quantity: 2, total: 190, tip: 100, type: "tab"},
        {date: "2011-11-14T22:48:05Z", quantity: 2, total: 91, tip: 0, type: "tab"},
        {date: "2011-11-14T22:51:40Z", quantity: 2, total: 190, tip: 100, type: "tab"},
        {date: "2011-11-14T22:58:54Z", quantity: 2, total: 100, tip: 0, type: "visa"},
        {date: "2011-11-14T23:06:25Z", quantity: 2, total: 190, tip: 100, type: "tab"},
        {date: "2011-11-14T23:07:58Z", quantity: 2, total: 190, tip: 100, type: "tab"},
        {date: "2011-11-14T23:16:09Z", quantity: 1, total: 200, tip: 100, type: "visa"},
        {date: "2011-11-14T23:21:22Z", quantity: 2, total: 190, tip: 100, type: "tab"},
        {date: "2011-11-14T23:23:29Z", quantity: 2, total: 190, tip: 100, type: "tab"},
        {date: "2011-11-14T23:28:54Z", quantity: 2, total: 190, tip: 100, type: "tab"}
      ]);

      // be sure you don't clobber a built-in method if you do this!
      try {
        data.date = data.dimension(function(d) { return new Date(d.date); });
        data.quantity = data.dimension(function(d) { return d.quantity; });
        data.tip = data.dimension(function(d) { return d.tip; });
        data.total = data.dimension(function(d) { return d.total; });
        data.type = data.dimension(function(d) { return d.type; });
      } catch (e) {
        console.log(e.stack);
      }

      return data;
    },

    "up to 32 dimensions supported": function() {
      var data = crossfilter([]);
      for (var i = 0; i < 32; i++) data.dimension(function() { return 0; });
      assert.throws(function() { data.dimension(function() { return 0; }); }, Error);
    },

    "can add and remove 32 dimensions repeatedly": function() {
      var data = crossfilter([]),
          dimensions = [];
      for (var j = 0; j < 10; j++) {
        for (var i = 0; i < 32; i++) dimensions.push(data.dimension(function() { return 0; }));
        while (dimensions.length) dimensions.pop().dispose();
      }
    },

    "empty data": {
      topic: function() {
        var data = crossfilter();
        try {
          data.quantity = data.dimension(function(d) { return d.quantity; });
        } catch (e) {
          console.log(e.stack);
        }
        return data;
      },

      "groupAll": {
        topic: function(data) {
          data.all = data.groupAll();
          return data;
        },
        "value": function(data) {
          assert.equal(data.all.value(), 0);
        },
        "value after removing all data": function(data) {
          try {
            data.add([{quantity: 2, total: 190}]);
            assert.equal(data.all.value(), 1);
          } finally {
            data.remove();
            assert.equal(data.all.value(), 0);
          }
        }
      },

      "dimension": {

        "groupAll (count, the default)": {
          topic: function(data) {
            data.quantity.count = data.quantity.groupAll();
            return data;
          },
          "value": function(data) {
            assert.equal(data.quantity.count.value(), 0);
          },
          "value after removing all data": function(data) {
            try {
              data.add([{quantity: 2, total: 190}]);
              assert.equal(data.quantity.count.value(), 1);
            } finally {
              data.remove();
              assert.equal(data.quantity.count.value(), 0);
            }
          }
        },

        "groupAll (sum of total)": {
          topic: function(data) {
            data.quantity.total = data.quantity.groupAll().reduceSum(function(d) { return d.total; });
            return data;
          },
          "value": function(data) {
            assert.equal(data.quantity.total.value(), 0);
          },
          "value after removing all data": function(data) {
            try {
              data.add([{quantity: 2, total: 190}]);
              assert.equal(data.quantity.total.value(), 190);
            } finally {
              data.remove();
              assert.equal(data.quantity.total.value(), 0);
            }
          }
        },

        "groupAll (custom reduce)": {
          topic: function(data) {
            data.quantity.custom = data.quantity.groupAll().reduce(add, remove, initial);
            function add(p, v) { return p + 1; }
            function remove(p, v) { return p - 1; }
            function initial() { return 1; }
            return data;
          },
          "value": function(data) {
            assert.equal(data.quantity.custom.value(), 1);
          },
          "value after removing all data": function(data) {
            try {
              data.add([{quantity: 2, total: 190}]);
              assert.equal(data.quantity.custom.value(), 2);
            } finally {
              data.remove();
              assert.equal(data.quantity.custom.value(), 1);
            }
          }
        }
      }
    },

    "dimension": {

      "top": {
        "returns the top k records by value, in descending order": function(data) {
          assert.deepEqual(data.total.top(3), [
            {date: "2011-11-14T16:28:54Z", quantity: 1, total: 300, tip: 200, type: "visa"},
            {date: "2011-11-14T20:49:07Z", quantity: 2, total: 290, tip: 200, type: "tab"},
            {date: "2011-11-14T21:18:48Z", quantity: 4, total: 270, tip: 0, type: "tab"}
          ]);
          assert.deepEqual(data.date.top(3), [
            {date: "2011-11-14T23:28:54Z", quantity: 2, total: 190, tip: 100, type: "tab"},
            {date: "2011-11-14T23:23:29Z", quantity: 2, total: 190, tip: 100, type: "tab"},
            {date: "2011-11-14T23:21:22Z", quantity: 2, total: 190, tip: 100, type: "tab"}
          ]);
        },
        "observes the associated dimension's filters": function(data) {
          try {
            data.quantity.filterExact(4);
            assert.deepEqual(data.total.top(3), [
              {date: "2011-11-14T21:18:48Z", quantity: 4, total: 270, tip: 0, type: "tab"}
            ]);
          } finally {
            data.quantity.filterAll();
          }
          try {
            data.date.filterRange([new Date(Date.UTC(2011, 10, 14, 19)), new Date(Date.UTC(2011, 10, 14, 20))]);
            assert.deepEqual(data.date.top(10), [
              {date: "2011-11-14T19:30:44Z", quantity: 2, total: 90, tip: 0, type: "tab"},
              {date: "2011-11-14T19:04:22Z", quantity: 2, total: 90, tip: 0, type: "tab"},
              {date: "2011-11-14T19:00:31Z", quantity: 2, total: 190, tip: 100, type: "tab"}
            ]);
            data.date.filterRange([Date.UTC(2011, 10, 14, 19), Date.UTC(2011, 10, 14, 20)]); // also comparable
            assert.deepEqual(data.date.top(10), [
              {date: "2011-11-14T19:30:44Z", quantity: 2, total: 90, tip: 0, type: "tab"},
              {date: "2011-11-14T19:04:22Z", quantity: 2, total: 90, tip: 0, type: "tab"},
              {date: "2011-11-14T19:00:31Z", quantity: 2, total: 190, tip: 100, type: "tab"}
            ]);
          } finally {
            data.date.filterAll();
          }
        },
        "observes other dimensions' filters": function(data) {
          try {
            data.type.filterExact("tab");
            assert.deepEqual(data.total.top(2), [
              {date: "2011-11-14T20:49:07Z", quantity: 2, total: 290, tip: 200, type: "tab"},
              {date: "2011-11-14T21:18:48Z", quantity: 4, total: 270, tip: 0, type: "tab"}
            ]);
            data.type.filterExact("visa");
            assert.deepEqual(data.total.top(1), [
              {date: "2011-11-14T16:28:54Z", quantity: 1, total: 300, tip: 200, type: "visa"}
            ]);
            data.quantity.filterExact(2);
            assert.deepEqual(data.tip.top(1), [
              {date: "2011-11-14T17:38:40Z", quantity: 2, total: 200, tip: 100, type: "visa"}
            ]);
          } finally {
            data.type.filterAll();
            data.quantity.filterAll();
          }
          try {
            data.type.filterExact("tab");
            assert.deepEqual(data.date.top(2), [
              {date: "2011-11-14T23:28:54Z", quantity: 2, total: 190, tip: 100, type: "tab"},
              {date: "2011-11-14T23:23:29Z", quantity: 2, total: 190, tip: 100, type: "tab"}
            ]);
            data.type.filterExact("visa");
            assert.deepEqual(data.date.top(1), [
              {date: "2011-11-14T23:16:09Z", quantity: 1, total: 200, tip: 100, type: "visa"}
            ]);
            data.quantity.filterExact(2);
            assert.deepEqual(data.date.top(1), [
              {date: "2011-11-14T22:58:54Z", quantity: 2, total: 100, tip: 0, type: "visa"}
            ]);
          } finally {
            data.type.filterAll();
            data.quantity.filterAll();
          }
        },
        "negative or zero k returns an empty array": function(data) {
          assert.deepEqual(data.quantity.top(0), []);
          assert.deepEqual(data.quantity.top(-1), []);
          assert.deepEqual(data.quantity.top(NaN), []);
          assert.deepEqual(data.quantity.top(-Infinity), []);
          assert.deepEqual(data.date.top(0), []);
          assert.deepEqual(data.date.top(-1), []);
          assert.deepEqual(data.date.top(NaN), []);
          assert.deepEqual(data.date.top(-Infinity), []);
        }
      },

      "bottom": {
        "returns the bottom k records by value, in descending order": function(data) {
          assert.deepEqual(data.total.bottom(3), [
            {date: "2011-11-14T22:30:22Z", quantity: 2, total: 89, tip: 0, type: "tab"},
            {date: "2011-11-14T16:30:43Z", quantity: 2, total: 90, tip: 0, type: "tab"},
            {date: "2011-11-14T16:48:46Z", quantity: 2, total: 90, tip: 0, type: "tab"}
          ]);
          assert.deepEqual(data.date.bottom(3), [
            {date: "2011-11-14T16:17:54Z", quantity: 2, total: 190, tip: 100, type: "tab"},
            {date: "2011-11-14T16:20:19Z", quantity: 2, total: 190, tip: 100, type: "tab"},
            {date: "2011-11-14T16:28:54Z", quantity: 1, total: 300, tip: 200, type: "visa"}
         ]);
        },
        "observes the associated dimension's filters": function(data) {
          try {
            data.quantity.filterExact(4);
            assert.deepEqual(data.total.bottom(3), [
              {date: "2011-11-14T21:18:48Z", quantity: 4, total: 270, tip: 0, type: "tab"}
            ]);
          } finally {
            data.quantity.filterAll();
          }
          try {
            data.date.filterRange([new Date(Date.UTC(2011, 10, 14, 19)), new Date(Date.UTC(2011, 10, 14, 20))]);
            assert.deepEqual(data.date.bottom(10), [
              {date: "2011-11-14T19:00:31Z", quantity: 2, total: 190, tip: 100, type: "tab"},
              {date: "2011-11-14T19:04:22Z", quantity: 2, total: 90, tip: 0, type: "tab"},
              {date: "2011-11-14T19:30:44Z", quantity: 2, total: 90, tip: 0, type: "tab"}
            ]);
            data.date.filterRange([Date.UTC(2011, 10, 14, 19), Date.UTC(2011, 10, 14, 20)]); // also comparable
            assert.deepEqual(data.date.bottom(10), [
              {date: "2011-11-14T19:00:31Z", quantity: 2, total: 190, type: "tab", tip: 100},
              {date: "2011-11-14T19:04:22Z", quantity: 2, total: 90, type: "tab", tip: 0},
              {date: "2011-11-14T19:30:44Z", quantity: 2, total: 90, type: "tab", tip: 0}
            ]);
          } finally {
            data.date.filterAll();
          }
        },
        "observes other dimensions' filters": function(data) {
          try {
            data.type.filterExact("tab");
            assert.deepEqual(data.total.bottom(2), [
              {date: "2011-11-14T22:30:22Z", quantity: 2, total: 89, tip: 0, type: "tab"},
              {date: "2011-11-14T16:30:43Z", quantity: 2, total: 90, tip: 0, type: "tab"}
            ]);
            data.type.filterExact("visa");
            assert.deepEqual(data.total.bottom(1), [
              {date: "2011-11-14T22:58:54Z", quantity: 2, total: 100, tip: 0, type: "visa"}
            ]);
            data.quantity.filterExact(2);
            assert.deepEqual(data.tip.bottom(1), [
              {date: "2011-11-14T22:58:54Z", quantity: 2, total: 100, tip: 0, type: "visa"}
            ]);
          } finally {
            data.type.filterAll();
            data.quantity.filterAll();
          }
          try {
            data.type.filterExact("tab");
            assert.deepEqual(data.date.bottom(2), [
              {date: "2011-11-14T16:17:54Z", quantity: 2, total: 190, tip: 100, type: "tab"},
              {date: "2011-11-14T16:20:19Z", quantity: 2, total: 190, tip: 100, type: "tab"}
            ]);
            data.type.filterExact("visa");
            assert.deepEqual(data.date.bottom(1), [
              {date: "2011-11-14T16:28:54Z", quantity: 1, total: 300, tip: 200, type: "visa"}
            ]);
            data.quantity.filterExact(2);
            assert.deepEqual(data.date.bottom(1), [
              {date: "2011-11-14T17:38:40Z", quantity: 2, total: 200, tip: 100, type: "visa"}
            ]);
          } finally {
            data.type.filterAll();
            data.quantity.filterAll();
          }
        },
        "negative or zero k returns an empty array": function(data) {
          assert.deepEqual(data.quantity.bottom(0), []);
          assert.deepEqual(data.quantity.bottom(-1), []);
          assert.deepEqual(data.quantity.bottom(NaN), []);
          assert.deepEqual(data.quantity.bottom(-Infinity), []);
          assert.deepEqual(data.date.bottom(0), []);
          assert.deepEqual(data.date.bottom(-1), []);
          assert.deepEqual(data.date.bottom(NaN), []);
          assert.deepEqual(data.date.bottom(-Infinity), []);
        }
      },

      "filterExact": {
        "selects records that match the specified value exactly": function(data) {
          try {
            data.tip.filterExact(100);
            assert.deepEqual(data.date.top(2), [
              {date: "2011-11-14T23:28:54Z", quantity: 2, total: 190, tip: 100, type: "tab"},
              {date: "2011-11-14T23:23:29Z", quantity: 2, total: 190, tip: 100, type: "tab"}
            ]);
          } finally {
            data.tip.filterAll();
          }
        },
        "allows the filter value to be null": function(data) {
          try {
            data.tip.filterExact(null); // equivalent to 0 by natural ordering
            assert.deepEqual(data.date.top(2), [
              {date: "2011-11-14T22:58:54Z", quantity: 2, total: 100, tip: 0, type: "visa"},
              {date: "2011-11-14T22:48:05Z", quantity: 2, total: 91, tip: 0, type: "tab"}
            ]);
          } finally {
            data.tip.filterAll();
          }
        }
      },

      "filterRange": {
        "selects records greater than or equal to the inclusive lower bound": function(data) {
          try {
            data.total.filterRange([100, 190]);
            assert.isTrue(data.date.top(Infinity).every(function(d) { return d.total >= 100; }));
            data.total.filterRange([110, 190]);
            assert.isTrue(data.date.top(Infinity).every(function(d) { return d.total >= 110; }));
          } finally {
            data.total.filterAll();
          }
        },
        "selects records less than the exclusive lower bound": function(data) {
          try {
            data.total.filterRange([100, 200]);
            assert.isTrue(data.date.top(Infinity).every(function(d) { return d.total < 200; }));
            data.total.filterRange([100, 190]);
            assert.isTrue(data.date.top(Infinity).every(function(d) { return d.total < 190; }));
          } finally {
            data.total.filterAll();
          }
        }
      },

      "filterAll": {
        "clears the filter": function(data) {
          data.total.filterRange([100, 200]);
          assert.lesser(data.date.top(Infinity).length, 43);
          data.total.filterAll();
          assert.equal(data.date.top(Infinity).length, 43);
        }
      },

      "filterFunction": {
        "selects records according to an arbitrary function": function(data) {
          try {
            data.total.filterFunction(function(d) { return d % 2; });
            assert.isTrue(data.date.top(Infinity).every(function(d) { return d.total % 2; }));
          } finally {
            data.total.filterAll();
          }
        },
        "respects truthy values": function(data) {
          try {
            var group = data.quantity.groupAll().reduceCount();
            data.total.filterRange([200, Infinity]);
            data.total.filterFunction(function(d) { return "0"; });
            assert.equal(group.value(), 43);
            data.total.filterFunction(function(d) { return ""; });
            assert.equal(group.value(), 0);
          } finally {
            data.total.filterAll();
          }
        },
        "groups on the first dimension are updated correctly": function(data) {
          try {
            var group = data.date.groupAll().reduceCount();
            data.total.filterFunction(function(d) { return d === 90; });
            assert.equal(group.value(), 13);
            data.total.filterFunction(function(d) { return d === 91; });
            assert.equal(group.value(), 1);
          } finally {
            data.total.filterAll();
          }
        },
        "followed by filterRange": function(data) {
          try {
            data.total.filterFunction(function(d) { return d % 2; });
            data.total.filterRange([100, 200]);
            assert.deepEqual(data.date.top(Infinity).length, 19);
          } finally {
            data.total.filterAll();
          }
        }
      },

      "filter": {
        "is equivalent to filterRange when passed an array": function(data) {
          try {
            data.total.filter([100, 190]);
            assert.isTrue(data.date.top(Infinity).every(function(d) { return d.total >= 100; }));
          } finally {
            data.total.filter(null);
          }
        },
        "is equivalent to filterExact when passed a single value": function(data) {
          try {
            data.total.filter(100);
            assert.isTrue(data.date.top(Infinity).every(function(d) { return d.total == 100; }));
          } finally {
            data.total.filter(null);
          }
        },
        "is equivalent to filterFunction when passed a function": function(data) {
          try {
            data.total.filter(function(d) { return d % 2; });
            assert.isTrue(data.date.top(Infinity).every(function(d) { return d.total % 2; }));
          } finally {
            data.total.filter(null);
          }
        },
        "is equivalent to filterAll when passed null": function(data) {
          data.total.filter([100, 200]);
          assert.lesser(data.date.top(Infinity).length, 43);
          data.total.filter(null);
          assert.equal(data.date.top(Infinity).length, 43);
        }
      },

      "groupAll (count, the default)": {
        topic: function(data) {
          data.quantity.count = data.quantity.groupAll();
          return data;
        },

        "does not have top and order methods": function(data) {
          assert.isFalse("top" in data.quantity.count);
          assert.isFalse("order" in data.quantity.count);
        },

        "reduce": {
          "reduces by add, remove, and initial": function(data) {
            try {
              data.quantity.count.reduce(
                  function(p, v) { return p + v.total; },
                  function(p, v) { return p - v.total; },
                  function() { return 0; });
              assert.strictEqual(data.quantity.count.value(), 6660);
            } finally {
              data.quantity.count.reduceCount();
            }
          }
        },

        "reduceCount": {
          "reduces by count": function(data) {
            data.quantity.count.reduceSum(function(d) { return d.total; });
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
        },

        "value": {
          "returns the count of matching records": function(data) {
            assert.strictEqual(data.quantity.count.value(), 43);
          },
          "does not observe the associated dimension's filters": function(data) {
            try {
              data.quantity.filterRange([100, 200]);
              assert.strictEqual(data.quantity.count.value(), 43);
            } finally {
              data.quantity.filterAll();
            }
          },
          "observes other dimensions' filters": function(data) {
            try {
              data.type.filterExact("tab");
              assert.strictEqual(data.quantity.count.value(), 32);
              data.type.filterExact("visa");
              assert.strictEqual(data.quantity.count.value(), 7);
              data.tip.filterExact(100);
              assert.strictEqual(data.quantity.count.value(), 5);
            } finally {
              data.type.filterAll();
              data.tip.filterAll();
            }
          }
        },

        "dispose": {
          "detaches from reduce listeners": function() {
            var data = crossfilter([0, 1, 2]),
                callback, // indicates a reduce has occurred in this group
                dimension = data.dimension(function(d) { return d; }),
                other = data.dimension(function(d) { return d; }),
                all = dimension.groupAll().reduce(function() { callback = true; }, function() { callback = true; }, function() {});
            all.value(); // force this group to be reduced when filters change
            callback = false;
            all.dispose();
            other.filterRange([1, 2]);
            assert.isFalse(callback);
          },
          "detaches from add listeners": function() {
            var data = crossfilter([0, 1, 2]),
                callback, // indicates data has been added and triggered a reduce
                dimension = data.dimension(function(d) { return d; }),
                all = dimension.groupAll().reduce(function() { callback = true; }, function() { callback = true; }, function() {});
            all.value(); // force this group to be reduced when data is added
            callback = false;
            all.dispose();
            data.add([3, 4, 5]);
            assert.isFalse(callback);
          }
        }
      },

      "groupAll (sum of total)": {
        topic: function(data) {
          data.quantity.total = data.quantity.groupAll().reduceSum(function(d) { return d.total; });
          return data;
        },

        "does not have top and order methods": function(data) {
          assert.isFalse("top" in data.quantity.total);
          assert.isFalse("order" in data.quantity.total);
        },

        "reduce": {
          "determines the computed reduce value": function(data) {
            try {
              data.quantity.total.reduce(
                  function(p) { return p + 1; },
                  function(p) { return p - 1; },
                  function() { return 0; });
              assert.strictEqual(data.quantity.total.value(), 43);
            } finally {
              data.quantity.total.reduceSum(function(d) { return d.total; });
            }
          }
        },

        "value": {
          "returns the sum total of matching records": function(data) {
            assert.strictEqual(data.quantity.total.value(), 6660);
          },
          "does not observe the associated dimension's filters": function(data) {
            try {
              data.quantity.filterRange([100, 200]);
              assert.strictEqual(data.quantity.total.value(), 6660);
            } finally {
              data.quantity.filterAll();
            }
          },
          "observes other dimensions' filters": function(data) {
            try {
              data.type.filterExact("tab");
              assert.strictEqual(data.quantity.total.value(), 4760);
              data.type.filterExact("visa");
              assert.strictEqual(data.quantity.total.value(), 1400);
              data.tip.filterExact(100);
              assert.strictEqual(data.quantity.total.value(), 1000);
            } finally {
              data.type.filterAll();
              data.tip.filterAll();
            }
          }
        }
      },

      "group": {
        topic: function(data) {
          data.date.hours = data.date.group(function(d) { d = new Date(+d); d.setHours(d.getHours(), 0, 0, 0); return d; });
          data.type.types = data.type.group();
          return data;
        },

        "key defaults to value": function(data) {
          assert.deepEqual(data.type.types.top(Infinity), [
            {key: "tab", value: 32},
            {key: "visa", value: 7},
            {key: "cash", value: 4}
          ]);
        },

        "cardinality may be greater than 256": function() {
          var data = crossfilter(d3.range(256).concat(256, 256)),
              index = data.dimension(function(d) { return d; }),
              indexes = index.group();
          assert.deepEqual(index.top(2), [256, 256]);
          assert.deepEqual(indexes.top(1), [{key: 256, value: 2}]);
          assert.equal(indexes.size(), 257);
        },

        "cardinality may be greater than 65536": function() {
          var data = crossfilter(d3.range(65536).concat(65536, 65536)),
              index = data.dimension(function(d) { return d; }),
              indexes = index.group();
          assert.deepEqual(index.top(2), [65536, 65536]);
          assert.deepEqual(indexes.top(1), [{key: 65536, value: 2}]);
          assert.equal(indexes.size(), 65537);
        },

        "size": {
          "returns the cardinality": function(data) {
            assert.equal(data.date.hours.size(), 8);
            assert.equal(data.type.types.size(), 3);
          },
          "ignores any filters": function(data) {
            try {
              data.type.filterExact("tab");
              data.quantity.filterRange([100, 200]);
              assert.equal(data.date.hours.size(), 8);
              assert.equal(data.type.types.size(), 3);
            } finally {
              data.quantity.filterAll();
              data.type.filterAll();
            }
          }
        },

        "reduce": {
          "defaults to count": function(data) {
            assert.deepEqual(data.date.hours.top(1), [
              {key: new Date(Date.UTC(2011, 10, 14, 17, 00, 00)), value: 9}
            ]);
          },
          "determines the computed reduce value": function(data) {
            try {
              data.date.hours.reduceSum(function(d) { return d.total; });
              assert.deepEqual(data.date.hours.top(1), [
                {key: new Date(Date.UTC(2011, 10, 14, 17, 00, 00)), value: 1240}
              ]);
            } finally {
              data.date.hours.reduceCount();
            }
          }
        },

        "top": {
          "returns the top k groups by reduce value, in descending order": function(data) {
            assert.deepEqual(data.date.hours.top(3), [
              {key: new Date(Date.UTC(2011, 10, 14, 17, 00, 00)), value: 9},
              {key: new Date(Date.UTC(2011, 10, 14, 16, 00, 00)), value: 7},
              {key: new Date(Date.UTC(2011, 10, 14, 21, 00, 00)), value: 6}
            ]);
          },
          "observes the specified order": function(data) {
            try {
              data.date.hours.order(function(v) { return -v; });
              assert.deepEqual(data.date.hours.top(3), [
                {key: new Date(Date.UTC(2011, 10, 14, 20, 00, 00)), value: 2},
                {key: new Date(Date.UTC(2011, 10, 14, 19, 00, 00)), value: 3},
                {key: new Date(Date.UTC(2011, 10, 14, 18, 00, 00)), value: 5}
              ]);
            } finally {
              data.date.hours.order(function(v) { return v; });
            }
          }
        },

        "order": {
          "defaults to the identity function": function(data) {
            assert.deepEqual(data.date.hours.top(1), [
              {key: new Date(Date.UTC(2011, 10, 14, 17, 00, 00)), value: 9}
            ]);
          },
          "is useful in conjunction with a compound reduce value": function(data) {
            try {
              data.date.hours.reduce(
                  function(p, v) { ++p.count; p.total += v.total; return p; },
                  function(p, v) { --p.count; p.total -= v.total; return p; },
                  function() { return {count: 0, total: 0}; })
                  .order(function(v) { return v.total; });
              assert.deepEqual(data.date.hours.top(1), [
                {key: new Date(Date.UTC(2011, 10, 14, 17, 00, 00)), value: {count: 9, total: 1240}}
              ]);
            } finally {
              data.date.hours.reduceCount().orderNatural();
            }
          }
        },

        "dispose": {
          "detaches from reduce listeners": function() {
            var data = crossfilter([0, 1, 2]),
                callback, // indicates a reduce has occurred in this group
                dimension = data.dimension(function(d) { return d; }),
                other = data.dimension(function(d) { return d; }),
                group = dimension
                  .group(function(d) { return d; })
                  .reduce(function() { callback = true; }, function() { callback = true; }, function() {});
            group.all(); // force this group to be reduced when filters change
            callback = false;
            group.dispose();
            other.filterRange([1, 2]);
            assert.isFalse(callback);
          },
          "detaches from add listeners": function() {
            var data = crossfilter([0, 1, 2]),
                callback, // indicates data has been added and the group has been reduced
                dimension = data.dimension(function(d) { return d; }),
                group = dimension
                  .group(function(d) { return d; })
                  .reduce(function() { callback = true; }, function() { callback = true; }, function() {});
            group.all(); // force this group to be reduced when filters change
            callback = false;
            group.dispose();
            data.add([3, 4, 5]);
            assert.isFalse(callback);
          }
        }
      },

      "dispose": {
        "detaches from add listeners": function() {
          var data = crossfilter([0, 1, 2]),
              callback, // indicates a reduce has occurred in this group
              dimension = data.dimension(function(d) { callback = true; return d; });
          callback = false;
          dimension.dispose();
          data.add([3, 4, 5]);
          assert.isFalse(callback);
        },
        "detaches groups from reduce listeners": function() {
          var data = crossfilter([0, 1, 2]),
              callback, // indicates a reduce has occurred in this group
              dimension = data.dimension(function(d) { return d; }),
              other = data.dimension(function(d) { return d; }),
              group = dimension
                .group(function(d) { return d; })
                .reduce(function() { callback = true; }, function() { callback = true; }, function() {});
          group.all(); // force this group to be reduced when filters change
          callback = false;
          dimension.dispose();
          other.filterRange([1, 2]);
          assert.isFalse(callback);
        },
        "detaches groups from add listeners": function() {
          var data = crossfilter([0, 1, 2]),
              callback, // indicates data has been added and the group has been reduced
              dimension = data.dimension(function(d) { return d; }),
              group = dimension
                .group(function(d) { return d; })
                .reduce(function() { callback = true; }, function() { callback = true; }, function() {});
          group.all(); // force this group to be reduced when filters change
          callback = false;
          dimension.dispose();
          data.add([3, 4, 5]);
          assert.isFalse(callback);
        },
        "clears dimension filters from groups": function() {
          var data = crossfilter([0, 0, 2, 2]),
              d1 = data.dimension(function(d) { return -d; }),
              d2 = data.dimension(function(d) { return +d; }),
              g2 = d2.group(function(d) { return Math.round( d / 2 ) * 2; }),
              all = g2.all();
          d1.filterRange([-1, 1]); // a filter is present when the dimension is disposed
          d1.dispose();
          assert.deepEqual(g2.all(), [{key: 0, value: 2}, {key: 2, value: 2}]);
        }
      }
    },

    "groupAll": {
      topic: function(data) {
        data.all = data.groupAll().reduceSum(function(d) { return d.total; });
        return data;
      },

      "does not have top and order methods": function(data) {
        assert.isFalse("top" in data.all);
        assert.isFalse("order" in data.all);
      },

      "reduce": {
        "determines the computed reduce value": function(data) {
          try {
            data.all.reduceCount();
            assert.strictEqual(data.all.value(), 43);
          } finally {
            data.all.reduceSum(function(d) { return d.total; });
          }
        }
      },

      "value": {
        "returns the sum total of matching records": function(data) {
          assert.strictEqual(data.all.value(), 6660);
        },
        "observes all dimension's filters": function(data) {
          try {
            data.type.filterExact("tab");
            assert.strictEqual(data.all.value(), 4760);
            data.type.filterExact("visa");
            assert.strictEqual(data.all.value(), 1400);
            data.tip.filterExact(100);
            assert.strictEqual(data.all.value(), 1000);
          } finally {
            data.type.filterAll();
            data.tip.filterAll();
          }
        }
      },

      "dispose": {
        "detaches from reduce listeners": function() {
          var data = crossfilter([0, 1, 2]),
              callback, // indicates a reduce has occurred in this group
              other = data.dimension(function(d) { return d; }),
              all = data.groupAll().reduce(function() { callback = true; }, function() { callback = true; }, function() {});
          all.value(); // force this group to be reduced when filters change
          callback = false;
          all.dispose();
          other.filterRange([1, 2]);
          assert.isFalse(callback);
        },
        "detaches from add listeners": function() {
          var data = crossfilter([0, 1, 2]),
              callback, // indicates data has been added and triggered a reduce
              all = data.groupAll().reduce(function() { callback = true; }, function() { callback = true; }, function() {});
          all.value(); // force this group to be reduced when data is added
          callback = false;
          all.dispose();
          data.add([3, 4, 5]);
          assert.isFalse(callback);
        }
      }
    },

    "size": {
      "returns the total number of elements": function(data) {
        assert.equal(data.size(), 43);
      },
      "is not affected by any dimension filters": function(data) {
        try {
          data.quantity.filterExact(4);
          assert.equal(data.size(), 43);
        } finally {
          data.quantity.filterAll();
        }
      }
    },

    "add": {
      "increases the size of the crossfilter": function() {
        var data = crossfilter([]);
        assert.equal(data.size(), 0);
        data.add([0, 1, 2, 3, 4, 5, 6, 6, 6, 7]);
        assert.equal(data.size(), 10);
        data.add([]);
        assert.equal(data.size(), 10);
      },
      "existing filters are consistent with new records": function(data) {
        var data = crossfilter([]),
            foo = data.dimension(function(d) { return +d; }),
            bar = data.dimension(function(d) { return -d; });
        assert.deepEqual(foo.top(Infinity), []);
        foo.filterExact(42);
        data.add([43, 42, 41]);
        assert.deepEqual(foo.top(Infinity), [42]);
        assert.deepEqual(bar.top(Infinity), [42]);
        data.add([43, 42]);
        assert.deepEqual(foo.top(Infinity), [42, 42]);
        assert.deepEqual(bar.top(Infinity), [42, 42]);
        foo.filterRange([42, 44]);
        data.add([43]);
        assert.deepEqual(foo.top(Infinity), [43, 43, 43, 42, 42]);
        assert.deepEqual(bar.top(Infinity), [42, 42, 43, 43, 43]);
        foo.filterFunction(function(d) { return d % 2 === 1; });
        data.add([44, 44, 45]);
        assert.deepEqual(foo.top(Infinity), [45, 43, 43, 43, 41]);
        assert.deepEqual(bar.top(Infinity), [41, 43, 43, 43, 45]);
        bar.filterExact([-43]);
        assert.deepEqual(bar.top(Infinity), [43, 43, 43]);
        data.add([43]);
        assert.deepEqual(bar.top(Infinity), [43, 43, 43, 43]);
        bar.filterAll();
        data.add([0]);
        assert.deepEqual(bar.top(Infinity), [41, 43, 43, 43, 43, 45]);
        foo.filterAll();
        assert.deepEqual(bar.top(Infinity), [0, 41, 42, 42, 43, 43, 43, 43, 44, 44, 45]);
      },
      "existing groups are consistent with new records": function(data) {
        var data = crossfilter([]),
            foo = data.dimension(function(d) { return +d; }),
            bar = data.dimension(function(d) { return -d; }),
            foos = foo.group(),
            all = data.groupAll();
        assert.equal(all.value(), 0);
        assert.deepEqual(foos.all(), []);
        foo.filterExact(42);
        data.add([43, 42, 41]);
        assert.equal(all.value(), 1);
        assert.deepEqual(foos.all(), [{key: 41, value: 1}, {key: 42, value: 1}, {key: 43, value: 1}]);
        bar.filterExact(-42);
        assert.equal(all.value(), 1);
        assert.deepEqual(foos.all(), [{key: 41, value: 0}, {key: 42, value: 1}, {key: 43, value: 0}]);
        data.add([43, 42, 41]);
        assert.equal(all.value(), 2);
        assert.deepEqual(foos.all(), [{key: 41, value: 0}, {key: 42, value: 2}, {key: 43, value: 0}]);
        bar.filterAll();
        assert.equal(all.value(), 2);
        assert.deepEqual(foos.all(), [{key: 41, value: 2}, {key: 42, value: 2}, {key: 43, value: 2}]);
        foo.filterAll();
        assert.equal(all.value(), 6);
      },
      "can add new groups that are before existing groups": function(data) {
        var data = crossfilter(),
            foo = data.dimension(function(d) { return +d; }),
            foos = foo.group().reduce(add, remove, initial).order(order);
        data.add([2]).add([1, 1, 1]);
        assert.deepEqual(foos.top(2), [{key: 1, value: {foo: 3}}, {key: 2, value: {foo: 1}}]);
        function order(p) { return p.foo; }
        function add(p, v) { ++p.foo; return p; }
        function remove(p, v) { --p.foo; return p; }
        function initial() { return {foo: 0}; }
      },
      "can add more than 256 groups": function(data) {
        var data = crossfilter(),
            foo = data.dimension(function(d) { return +d; }),
            bar = data.dimension(function(d) { return +d; }),
            foos = foo.group();
        data.add(d3.range(0, 256));
        assert.deepEqual(foos.all().map(function(d) { return d.key; }), d3.range(0, 256));
        assert(foos.all().every(function(d) { return d.value == 1; }));
        data.add([128]);
        assert.deepEqual(foos.top(1), [{key: 128, value: 2}]);
        bar.filterExact(0);
        data.add(d3.range(-256, 0));
        assert.deepEqual(foos.all().map(function(d) { return d.key; }), d3.range(-256, 256));
        assert.deepEqual(foos.top(1), [{key: 0, value: 1}]);
      },
      "can add lots of groups in reverse order": function(data) {
        var data = crossfilter(),
            foo = data.dimension(function(d) { return -d.foo; }),
            bar = data.dimension(function(d) { return d.bar; }),
            foos = foo.group(Math.floor).reduceSum(function(d) { return d.foo; });
        bar.filterExact(1);
        for (var i = 0; i < 1000; i++) {
          data.add(d3.range(10).map(function(d) {
            return {foo: i + d / 10, bar: i % 4, baz: d + i * 10};
          }));
        }
        assert.deepEqual(foos.top(1), [{key: -998, value: 8977.5}]);
      }
    },
    "remove": {
      topic: function() {
        var data = crossfilter();
        data.foo = data.dimension(function(d) { return d.foo; });
        data.foo.div2 = data.foo.group(function(value) { return Math.floor(value / 2); });
        data.foo.positive = data.foo.group(function(value) { return value > 0 | 0; });
        return data;
      },
      "removing a record works for a group with cardinality one": function(data) {
        data.add([{foo: 1}, {foo: 1.1}, {foo: 1.2}]);
        data.foo.filter(1.1);
        data.remove();
        data.foo.filterAll();
        data.remove();
        assert.deepEqual(data.foo.top(Infinity), []);
      },
      "removing a record works for another group with cardinality one": function(data) {
        data.add([{foo: 0}, {foo: -1}]);
        assert.deepEqual(data.foo.positive.all(), [{key: 0, value: 2}]);
        data.foo.filter(0);
        data.remove();
        assert.deepEqual(data.foo.positive.all(), [{key: 0, value: 1}]);
        data.foo.filterAll();
        assert.deepEqual(data.foo.top(Infinity), [{foo: -1}]);
        data.remove();
        assert.deepEqual(data.foo.top(Infinity), []);
      },
      "removing a record updates dimension": function(data) {
        data.add([{foo: 1}, {foo: 2}]);
        data.foo.filterExact(1);
        data.remove();
        data.foo.filterAll();
        assert.deepEqual(data.foo.top(Infinity), [{foo: 2}]);
        data.remove();
        assert.deepEqual(data.foo.top(Infinity), []);
      },
      "removing records updates group": function(data) {
        data.add([{foo: 1}, {foo: 2}, {foo: 3}]);
        assert.deepEqual(data.foo.top(Infinity), [{foo: 3}, {foo: 2}, {foo: 1}]);
        assert.deepEqual(data.foo.div2.all(), [{key: 0, value: 1}, {key: 1, value: 2}]);
        data.foo.filterRange([1, 3]);
        data.remove();
        data.foo.filterAll();
        assert.deepEqual(data.foo.top(Infinity), [{foo: 3}]);
        assert.deepEqual(data.foo.div2.all(), [{key: 1, value: 1}]);
        data.remove();
        assert.deepEqual(data.foo.top(Infinity), []);
        assert.deepEqual(data.foo.div2.all(), []);
      },
      "filtering works correctly after removing a record": function(data) {
        data.add([{foo: 1}, {foo: 2}, {foo: 3}]);
        data.foo.filter(2);
        data.remove();
        data.foo.filterAll();
        assert.deepEqual(data.foo.top(Infinity), [{foo: 3}, {foo: 1}]);
        data.remove();
        assert.deepEqual(data.foo.top(Infinity), []);
      }
    }
  }
});

function key(d) {
  return d.key;
}

suite.export(module);
