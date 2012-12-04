var vows = require("vows"),
    assert = require("assert"),
    crossfilter = require("../");

var suite = vows.describe("pivot");

suite.addBatch({
  "pivot all": {
    topic: [
      { gender:'Female', handed:'Right-handed'},
      { gender:'Male', handed:'Left-handed'},
      { gender:'Female', handed:'Right-handed'},
      { gender:'Male', handed:'Right-handed'},
      { gender:'Male', handed:'Left-handed'},
      { gender:'Male', handed:'Right-handed'},
      { gender:'Female', handed:'Right-handed'},
      { gender:'Female', handed:'Left-handed'},
      { gender:'Male', handed:'Right-handed'},
      { gender:'Female', handed:'Right-handed'},
    ],
    "counts records by default": function(data) {
      var c = crossfilter(data),
          dimGender = c.dimension(function(v) { return v.gender }),
          groupGender = dimGender.group(),
          dimHanded = c.dimension(function(v) { return v.handed }),
          groupHanded = dimHanded.group(),
          p = c.pivotGroup([groupGender, groupHanded])

      assert.deepEqual(groupGender.all(), [{key:'Female', value:5}, {key:'Male', value:5}])
      assert.deepEqual(groupHanded.all(), [{key:'Left-handed', value:3}, {key:'Right-handed', value:7}])
      assert.deepEqual(p.all(), [{key:['Female', 'Left-handed'], value:1}, 
                                 {key:['Female', 'Right-handed'], value:4}, 
                                 {key:['Male', 'Left-handed'], value:2}, 
                                 {key:['Male', 'Right-handed'], value:3}])
    }
  }
})

suite.export(module)
