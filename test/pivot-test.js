var vows = require("vows"),
    console = require("console"),
    assert = require("assert"),
    crossfilter = require("../");

var suite = vows.describe("pivot");

suite.addBatch({
  "pivot small data set": {
    topic: function() { return function() {

      var rslt = {}
      rslt.data = [ { gender:'Female', handed:'Right-handed', score: 9},
                    { gender:'Male', handed:'Left-handed', score: 2},
                    { gender:'Female', handed:'Right-handed', score: 32},
                    { gender:'Male', handed:'Right-handed', score: 22},
                    { gender:'Male', handed:'Left-handed', score: 3},
                    { gender:'Male', handed:'Right-handed', score: 21},
                    { gender:'Female', handed:'Right-handed', score: 99},
                    { gender:'Female', handed:'Left-handed', score: 12},
                    { gender:'Male', handed:'Right-handed', score: 0},
                    { gender:'Female', handed:'Right-handed', score: 1},
                  ]
      rslt.c = crossfilter(rslt.data)
      rslt.dim = { gender: rslt.c.dimension(function(v) { return v.gender }), handed: rslt.c.dimension(function(v) { return v.handed }) }
      rslt.group = { gender: rslt.dim.gender.group(), handed: rslt.dim.handed.group() }
      return rslt
    }},
    "counts records by default": function(fixture) {
      var p 

      fixture = fixture()
      p = fixture.c.pivotGroup([fixture.group.gender, fixture.group.handed])

      assert.deepEqual(p.all(), [{key:['Female', 'Left-handed'], value:1}, 
                                 {key:['Female', 'Right-handed'], value:4}, 
                                 {key:['Male', 'Left-handed'], value:2}, 
                                 {key:['Male', 'Right-handed'], value:3}])
    },
    "respects filters": function(fixture) {
      var p

      fixture = fixture()
      p = fixture.c.pivotGroup([fixture.group.gender, fixture.group.handed])
      fixture.dim.gender.filter('Female')
      
      assert.deepEqual(p.all(), [{key:['Female', 'Left-handed'], value:1}, 
                                 {key:['Female', 'Right-handed'], value:4}, 
                                 {key:['Male', 'Left-handed'], value:0}, 
                                 {key:['Male', 'Right-handed'], value:0}])
    },
    "updates when filters change": function(fixture) {
      var p

      fixture = fixture()
      p = fixture.c.pivotGroup([fixture.group.gender, fixture.group.handed])
      fixture.dim.gender.filter('Female')
      
      assert.deepEqual(p.all(), [{key:['Female', 'Left-handed'], value:1}, 
                                 {key:['Female', 'Right-handed'], value:4}, 
                                 {key:['Male', 'Left-handed'], value:0}, 
                                 {key:['Male', 'Right-handed'], value:0}])

      fixture.dim.gender.filter('Male')
      assert.deepEqual(p.all(), [{key:['Female', 'Left-handed'], value:0}, 
                                 {key:['Female', 'Right-handed'], value:0}, 
                                 {key:['Male', 'Left-handed'], value:2}, 
                                 {key:['Male', 'Right-handed'], value:3}])

      fixture.dim.gender.filter(null)
      assert.deepEqual(p.all(), [{key:['Female', 'Left-handed'], value:1}, 
                                 {key:['Female', 'Right-handed'], value:4}, 
                                 {key:['Male', 'Left-handed'], value:2}, 
                                 {key:['Male', 'Right-handed'], value:3}])
    },
    "custom reduce function": function(fixture) {
      var p 
      
      fixture = fixture()
      p = fixture.c.pivotGroup([fixture.group.gender, fixture.group.handed])
      p.reduce(function(p, v) { return p * v.score }, function(p,v) { return p / v.score }, function() { return 1 })

      assert.deepEqual(p.all(), [{key:['Female', 'Left-handed'], value:12}, 
                                 {key:['Female', 'Right-handed'], value:9*32*99*1}, 
                                 {key:['Male', 'Left-handed'], value:2*3}, 
                                 {key:['Male', 'Right-handed'], value:0}])
    }
  },
  "pivot large data set": {
    topic: function() { return function() {
      var rslt = {}
      rslt.data = [
        {date: "2011-11-14T16:17:54Z", quantity: 2, total: 191, tip: 100, type: "tab"},
        {date: "2011-11-14T16:20:19Z", quantity: 2, total: 193, tip: 100, type: "tab"},
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
      ]
      rslt.data.forEach(function(cur, idx) { cur.idx = idx })

      rslt.c = crossfilter(rslt.data)
      rslt.dim = { type: rslt.c.dimension(function(v) { return v.type }), tip: rslt.c.dimension(function(v) { return v.tip }), date: rslt.c.dimension(function(v) { return new Date(v.date) }) }
      rslt.group = { type: rslt.dim.type.group(), tip: rslt.dim.tip.group(), dateHour: rslt.dim.date.group(function(v) { return v.getUTCHours() })}
      return rslt
    }},
    "reduce function": function(fixture) {
      var p 

      fixture = fixture()
      p = fixture.c.pivotGroup([fixture.group.type, fixture.group.tip, fixture.group.dateHour])
      p.reduce(function(p, v) { return p + v.total + v.idx*7 }, function(p,v) { return p - v.total - v*idx*7 }, function() { return 0 })

      assert.deepEqual(p.all(), [       
      { key: [ 'cash', 0, 16 ], value: 142 },  { key: [ 'cash', 0, 17 ], value: 270 }, { key: [ 'cash', 0, 18 ], value: 233 }, { key: [ 'cash', 0, 20 ], value: 268 },
      { key: [ 'tab', 0, 16 ], value: 354 }, { key: [ 'tab', 0, 17 ], value: 814 }, { key: [ 'tab', 0, 18 ], value: 230 }, { key: [ 'tab', 0, 19 ], value: 495 }, { key: [ 'tab', 0, 21 ], value: 1038 }, { key: [ 'tab', 0, 22 ], value: 642 },
      { key: [ 'tab', 100, 16 ], value: 391 }, { key: [ 'tab', 100, 17 ], value: 274 }, { key: [ 'tab', 100, 18 ], value: 611 }, { key: [ 'tab', 100, 19 ], value: 337 }, { key: [ 'tab', 100, 21 ], value: 793 }, { key: [ 'tab', 100, 22 ], value: 856 }, { key: [ 'tab', 100, 23 ], value: 2336 },
      { key: [ 'tab', 200, 20 ], value: 465 },
      { key: [ 'visa', 0, 22 ], value: 352 }, 
      { key: [ 'visa', 100, 17 ], value: 575 }, {   key: [ 'visa', 100, 18 ], value: 326 }, {   key: [ 'visa', 100, 21 ], value: 396 }, {   key: [ 'visa', 100, 23 ], value: 473 },
      { key: [ 'visa', 200, 16 ], value: 314
      }])


    }
  }
})

suite.export(module)
