JS_TESTER = ./node_modules/vows/bin/vows
JS_COMPILER = ./node_modules/uglify-js/bin/uglifyjs

.PHONY: test benchmark

all: crossfilter.min.js

crossfilter.js: \
	src/func.js \
	src/sort.js \
	src/struct.js \
	src/index.js \
	package.json \
	build \
	src/vaccine.js \
	Makefile

%.min.js: %.js Makefile
	@rm -f $@
	$(JS_COMPILER) < $< > $@

%.js:
	@rm -f $@
	./build $(filter-out src/vaccine.js, $(filter %.js,$^)) > $@
	@chmod a-w $@

clean:
	rm -f crossfilter.js crossfilter.min.js

test:
	@$(JS_TESTER)

benchmark:
	@node test/benchmark.js
