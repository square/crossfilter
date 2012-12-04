var vows = require("vows"),
    assert = require("assert"),
    crossfilter = require("../");

var suite = vows.describe("pivot");

suite.addBatch({
  "pivot all": {
    topic: function() {
      var rslt = {}
      rslt.data = [ { gender:'Female', handed:'Right-handed'},
                    { gender:'Male', handed:'Left-handed'},
                    { gender:'Female', handed:'Right-handed'},
                    { gender:'Male', handed:'Right-handed'},
                    { gender:'Male', handed:'Left-handed'},
                    { gender:'Male', handed:'Right-handed'},
                    { gender:'Female', handed:'Right-handed'},
                    { gender:'Female', handed:'Left-handed'},
                    { gender:'Male', handed:'Right-handed'},
                    { gender:'Female', handed:'Right-handed'},
                  ]
      rslt.c = crossfilter(rslt.data)
      rslt.dim = { gender: rslt.c.dimension(function(v) { return v.gender }), handed: rslt.c.dimension(function(v) { return v.handed }) }
      rslt.group = { gender: rslt.dim.gender.group(), handed: rslt.dim.handed.group() }
      return rslt
    },
    "counts records by default": function(fixture) {
      var p = fixture.c.pivotGroup([fixture.group.gender, fixture.group.handed])

      assert.deepEqual(p.all(), [{key:['Female', 'Left-handed'], value:1}, 
                                 {key:['Female', 'Right-handed'], value:4}, 
                                 {key:['Male', 'Left-handed'], value:2}, 
                                 {key:['Male', 'Right-handed'], value:3}])
    },
    "respects filters": function(fixture) {
      var p = fixture.c.pivotGroup([fixture.group.gender, fixture.group.handed])

      fixture.dim.gender.filter('Female')
      
      assert.deepEqual(p.all(), [{key:['Female', 'Left-handed'], value:1}, 
                                 {key:['Female', 'Right-handed'], value:4}, 
                                 {key:['Male', 'Left-handed'], value:0}, 
                                 {key:['Male', 'Right-handed'], value:0}])
    }
  }
})

suite.export(module)
