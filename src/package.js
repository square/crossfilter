var util = require("util"),
    tesseract = require("../tesseract").tesseract;

util.puts(JSON.stringify({
  "name": "tesseract",
  "version": tesseract.version,
  "private": true,
  "main": "./index.js",
  "devDependencies": {
    "d3": "2.8.0",
    "vows": "0.6.1",
    "uglify-js": "1.2.5"
  }
}, null, 2));
