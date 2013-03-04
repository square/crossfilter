var util = require("util"),
    crossfilter = require("../crossfilter").crossfilter;

util.puts(JSON.stringify({
  "name": "crossfilter",
  "version": crossfilter.version,
  "description": "Fast multidimensional filtering for coordinated views.",
  "keywords": [
    "square",
    "analytics",
    "visualization"
  ],
  "author": {name: "Mike Bostock", "url": "http://bost.ocks.org/mike"},
  "contributors": [{name: "Jason Davies", "url": "http://www.jasondavies.com/"}],
  "maintainers": [{"name": "Tom Carden", "url": "http://github.com/RandomEtc"}],
  "homepage": "http://square.github.com/crossfilter/",
  "main": "./index.js",
  "repository": {
    "type": "git",
    "url": "http://github.com/square/crossfilter.git"
  },
  "devDependencies": {
    "d3": "3.0.x",
    "vows": "0.7.0",
    "uglify-js": "git://github.com/mishoo/UglifyJS2.git#aebafad4"
  },
  "scripts": {"test": "./node_modules/.bin/vows"}
}, null, 2));
