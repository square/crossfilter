var vows = require("vows"),
    assert = require("assert"),
    fs = require("fs"),
    packageText = fs.readFileSync(__dirname + "/../package.json", "utf8"),
    version = JSON.parse(packageText).version;

var suite = vows.describe("version");

suite.addBatch({
  "version": {
    topic: version,
    "has the form major.minor.patch": function(version) {
      assert.match(version, /^[0-9]+\.[0-9]+\.[0-9]+$/);
    }
  }
});

suite.export(module);
