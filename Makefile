JS_TESTER = ./node_modules/vows/bin/vows
JS_COMPILER = ./node_modules/uglify-js/bin/uglifyjs

.PHONY: test benchmark

all: crossfilter.min.js package.json

crossfilter.js: \
	src/version.js \
	src/func.js \
	src/sort.js \
	src/struct.js \
	src/index.js \
	build \
	Makefile

%.min.js: %.js Makefile
	@rm -f $@
	$(JS_COMPILER) < $< > $@

%.js:
	@rm -f $@
	./build $(filter %.js,$^) > $@
	@chmod a-w $@

package.json: src/version.js src/package.js
	@rm -f $@
	node src/package.js > $@
	@chmod a-w $@

clean:
	rm -f crossfilter.js crossfilter.min.js package.json

test:
	@$(JS_TESTER)

benchmark:
	@node test/benchmark.js
