var vows = require("vows"),
    console = require("console"),
    assert = require("assert"),
    crossfilter = require("../");

var suite = vows.describe("pivot");

suite.addBatch({
  "pivot all": {
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
  }
})

suite.export(module)
