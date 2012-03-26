var util = require("util"),
    crossfilter = require("../crossfilter").crossfilter;

util.puts(JSON.stringify({
  "name": "crossfilter",
  "version": crossfilter.version,
  "private": true,
  "main": "./index.js",
  "devDependencies": {
    "d3": "2.8.0",
    "vows": "0.6.1",
    "uglify-js": "1.2.5"
  }
}, null, 2));
