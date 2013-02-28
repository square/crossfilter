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
  "homepage": "http://square.github.com/crossfilter/",
  "main": "./index.js",
  "repository": {
    "type": "git",
    "url": "http://github.com/square/crossfilter.git"
  },
  "devDependencies": {
    "d3": "3.0.x",
    "vows": "0.7.0",
    "uglify-js": "2.2.5"
  }
}, null, 2));
