JS_TESTER = ./node_modules/vows/bin/vows
JS_COMPILER = ./node_modules/uglify-js/bin/uglifyjs

.PHONY: test benchmark

all: tesseract.min.js package.json

tesseract.js: \
	src/version.js \
	src/identity.js \
	src/permute.js \
	src/bisect.js \
	src/heap.js \
	src/heapselect.js \
	src/insertionsort.js \
	src/quicksort.js \
	src/array.js \
	src/filter.js \
	src/null.js \
	src/zero.js \
	src/reduce.js \
	src/tesseract.js \
	Makefile

%.min.js: %.js Makefile
	@rm -f $@
	$(JS_COMPILER) < $< > $@

%.js:
	@rm -f $@
	@echo '(function(exports){' > $@
	cat $(filter %.js,$^) >> $@
	@echo '})(this);' >> $@
	@chmod a-w $@

package.json: tesseract.js src/package.js
	@rm -f $@
	node src/package.js > $@
	@chmod a-w $@

clean:
	rm -f tesseract.js tesseract.min.js package.json

test: all
	@$(JS_TESTER)

benchmark: all
	@node test/benchmark.js
