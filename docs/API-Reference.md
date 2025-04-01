# API Reference

Everything in Crossfilter is scoped under the `crossfilter` namespace, which is also the [constructor](#crossfilter). Crossfilter uses [semantic versioning](http://semver.org/). You can find the current version as `crossfilter.version`, which is a string of the form "X.Y.Z", where *X* is the major version number, *Y* is the minor version number, and *Z* is the patch version number.

## Crossfilter

A crossfilter represents a multi-dimensional dataset.

<a name="crossfilter" href="#wiki-crossfilter">#</a> <b>crossfilter</b>([<i>records</i>])

Constructs a new crossfilter. If *records* is specified, simultaneously [adds](#crossfilter_add) the specified *records*. Records can be any array of JavaScript objects or primitives. For example, you might construct a small crossfilter of payments like so:

```js
var payments = crossfilter([
  {date: "2011-11-14T16:17:54Z", quantity: 2, total: 190, tip: 100, type: "tab"},
  {date: "2011-11-14T16:20:19Z", quantity: 2, total: 190, tip: 100, type: "tab"},
  {date: "2011-11-14T16:28:54Z", quantity: 1, total: 300, tip: 200, type: "visa"},
  {date: "2011-11-14T16:30:43Z", quantity: 2, total: 90, tip: 0, type: "tab"},
  {date: "2011-11-14T16:48:46Z", quantity: 2, total: 90, tip: 0, type: "tab"},
  {date: "2011-11-14T16:53:41Z", quantity: 2, total: 90, tip: 0, type: "tab"},
  {date: "2011-11-14T16:54:06Z", quantity: 1, total: 100, tip: 0, type: "cash"},
  {date: "2011-11-14T16:58:03Z", quantity: 2, total: 90, tip: 0, type: "tab"},
  {date: "2011-11-14T17:07:21Z", quantity: 2, total: 90, tip: 0, type: "tab"},
  {date: "2011-11-14T17:22:59Z", quantity: 2, total: 90, tip: 0, type: "tab"},
  {date: "2011-11-14T17:25:45Z", quantity: 2, total: 200, tip: 0, type: "cash"},
  {date: "2011-11-14T17:29:52Z", quantity: 1, total: 200, tip: 100, type: "visa"}
]);
```

<a name="crossfilter_add" href="#wiki-crossfilter_add">#</a> crossfilter.<b>add</b>(<i>records</i>)

Adds the specified records to this crossfilter.

<a name="crossfilter_remove" href="#wiki-crossfilter_remove">#</a> crossfilter.<b>remove</b>()

Removes all records that match the current filters from this crossfilter.

<a name="crossfilter_size" href="#wiki-crossfilter_size">#</a> crossfilter.<b>size</b>()

Returns the number of records in the crossfilter, independent of any filters. For example, if you only added a single batch of *records* to the Crossfilter, this method would return *records.length*.

<a name="crossfilter_groupAll" href="#wiki-crossfilter_groupAll">#</a> crossfilter.<b>groupAll</b>()

A convenience function for grouping all records and reducing to a single value. See [groupAll](#wiki-dimension_groupAll) for details.  Note: unlike a dimension's groupAll, this grouping observes all current filters.

## Dimension

<a name="dimension" href="#wiki-dimension">#</a> crossfilter.<b>dimension</b>(<i>value</i>)

Constructs a new dimension using the specified *value* accessor function. **The function must return naturally-ordered values**, *i.e.*, values that behave correctly with respect to JavaScript's `<`, `<=`, `>=` and `>` operators. This typically means primitives: booleans, numbers or strings; however, you can override [object.valueOf](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/ValueOf) to provide a comparable value from a given object, such as a Date.

In particular, note that incomparable values such as `NaN` and `undefined` are not supported. In addition, care should be taken when mixing types, e.g., strings and numbers. If strings and numbers are mixed, the strings will be coerced to numbers, and hence the strings *must* all be coercible to number, otherwise unsupported `NaN` values will result.

For example, to create a dimension by payment total:

```js
var paymentsByTotal = payments.dimension(function(d) { return d.total; });
```

The value returned by a dimension's accessor function for a given record should be deterministic and never change for the existence of the crossfilter. Performance note: internally, the values for a given dimension are cached. Therefore, if the dimension value is derived from other properties, it is not necessary to cache derived values outside of the crossfilter. The *value* function is only called when records are added to the Crossfilter.

Dimensions are bound to the crossfilter once created. Creating more than 8 dimensions, and more than 16 dimensions, introduces additional overhead. More than 32 dimensions at once is not currently supported, but dimensions may be disposed of using [dimension.dispose](#wiki-dimension_dispose) to make room for new dimensions. Dimensions are stateful, recording the associated dimension-specific filters, if any. Initially, no filters are applied to the dimension: all records are selected. Since creating dimensions is expensive, you should be careful to keep a reference to whatever dimensions you create.

<a name="dimension_filter" href="#wiki-dimension_filter">#</a> dimension.<b>filter</b>(<i>value</i>)

Filters records such that this dimension's value matches *value*, and returns this dimension. The specified *value* may be null, in which case this method is equivalent to [filterAll](#wiki-dimension_filterAll); or, *value* may be an array, in which case this method is equivalent to [filterRange](#wiki-dimension_filterRange); or, *value* may be a function, in which case this method is equivalent to [filterFunction](#wiki-dimension_filterFunction); otherwise, this method is equivalent to [filterExact](#wiki-dimension_filterExact). For example:

```js
paymentsByTotal.filter([100, 200]); // selects payments whose total is between 100 and 200
paymentsByTotal.filter(120); // selects payments whose total equals 120
paymentsByTotal.filter(function(d) { return d % 2; }); // selects payments whose total is odd
paymentsByTotal.filter(null); // selects all payments
```

Calling filter replaces the existing filter for this dimension, if any.

<a name="dimension_filterExact" href="#wiki-dimension_filterExact">#</a> dimension.<b>filterExact</b>(<i>value</i>)

Filters records such that this dimension's value equals *value*, and returns this dimension. For example:

```js
paymentsByTotal.filterExact(120); // selects payments whose total equals 120
```

Note that exact comparisons are performed using the ordering operators (`<`, `<=`, `>=`, `>`). For example, if you pass an exact value of null, this is equivalent to 0; filtering does not use the `==` or `===` operator.

Calling filterExact replaces the existing filter on this dimension, if any.

<a name="dimension_filterRange" href="#wiki-dimension_filterRange">#</a> dimension.<b>filterRange</b>(<i>range</i>)

Filters records such that this dimension's value is greater than or equal to *range[0]*, and less than *range[1]*, returning this dimension. For example:

```js
paymentsByTotal.filterRange([100, 200]); // selects payments whose total is between 100 and 200
```

Calling filterRange replaces the existing filter on this dimension, if any.

<a name="dimension_filterFunction" href="#wiki-dimension_filterFunction">#</a> dimension.<b>filterFunction</b>(<i>function</i>)

Filters records such that the specified *function* returns truthy when called with this dimension's value, and returns this dimension. For example:

```js
paymentsByTotal.filterFunction(function(d) { return d % 2; }); // selects payments whose total is odd
```

This can be used to implement a UNION filter, e.g.

```js
// Selects payments whose total is between 0 and 10 or 20 and 30:
paymentsByTotal.filterFunction(function(d) { return 0 <= d && d < 10 || 20 <= d && d < 30; });
```

<a name="dimension_filterAll" href="#wiki-dimension_filterAll">#</a> dimension.<b>filterAll</b>()

Clears any filters on this dimension, selecting all records and returning this dimension. For example:

```js
paymentsByTotal.filterAll(); // selects all payments
```

<a name="dimension_top" href="#wiki-dimension_top">#</a> dimension.<b>top</b>(<i>k</i>)

Returns a new array containing the top *k* records, according to the natural order of this dimension. The returned array is sorted by descending natural order. This method intersects the crossfilter's current filters, returning only records that satisfy every active filter (including this dimension's filter). For example, to retrieve the top 4 payments by total:

```js
var topPayments = paymentsByTotal.top(4); // the top four payments, by total
topPayments[0]; // the biggest payment
topPayments[1]; // the second-biggest payment
// etc.
```

If there are fewer than *k* records selected according to all of the crossfilter's filters, then an array smaller than *k* will be returned. For example, to retrieve all selected payments in descending order by total:

```js
var allPayments = paymentsByTotal.top(Infinity);
```

<a name="dimension_bottom" href="#wiki-dimension_bottom">#</a> dimension.<b>bottom</b>(<i>k</i>)

Returns a new array containing the bottom *k* records, according to the natural order of this dimension. The returned array is sorted by ascending natural order. This method intersects the crossfilter's current filters, returning only records that satisfy every active filter (including this dimension's filter). For example, to retrieve the bottom 4 payments by total:

```js
var bottomPayments = paymentsByTotal.bottom(4); // the bottom four payments, by total
bottomPayments[0]; // the smallest payment
bottomPayments[1]; // the second-smallest payment
// etc.
```

<a name="dimension_dispose" href="#wiki-dimension_dispose">#</a> dimension.<b>dispose</b>()

Removes this dimension (and its groups) from its crossfilter. This frees up space for other dimensions to be added to this crossfilter.

## Group (Map-Reduce)

<a name="dimension_group" href="#wiki-dimension_group">#</a> dimension.<b>group</b>([<i>groupValue</i>])

Constructs a new grouping for the given dimension, according to the specified *groupValue* function, which takes a dimension value as input and returns the corresponding rounded value. The *groupValue* function is optional; if not specified, it defaults to the identity function. Like the value function, *groupValue* must return a naturally-ordered value; furthermore, this order must be consistent with the dimension's value function! For example, to count payments by dollar amount:

```js
var paymentGroupsByTotal = paymentsByTotal.group(function(total) { return Math.floor(total / 100); });
```

By default, the group's reduce function will count the number of records per group. In addition, the groups will be ordered by count.

Note: a grouping intersects the crossfilter's current filters, **except for the associated dimension's filter**. Thus, group methods consider only records that satisfy every filter except this dimension's filter. So, if the crossfilter of payments is filtered by type and total, then group by total only observes the filter by type.

<a name="group_size" href="#wiki-group_size">#</a> group.<b>size</b>()

Returns the number of distinct values in the group, independent of any filters; the cardinality.

<a name="group_reduce" href="#wiki-group_reduce">#</a> group.<b>reduce</b>(<i>add</i>, <i>remove</i>, <i>initial</i>)

Specifies the reduce functions for this grouping, and returns this grouping. The default behavior, reduce by count, is implemented as follows:

```js
function reduceAdd(p, v) {
  return p + 1;
}

function reduceRemove(p, v) {
  return p - 1;
}

function reduceInitial() {
  return 0;
}
```

To reduce by sum of total, you could change the add and remove functions as follows:

```js
function reduceAdd(p, v) {
  return p + v.total;
}

function reduceRemove(p, v) {
  return p - v.total;
}
```

The *remove* function is needed in addition to *add* because the group reduces are updated incrementally as records are filtered; in some cases, it is necessary to remove records from a previously-computed group reduction. To work with many different attributes, you can [build your add and remove functions in a Javascript closure](https://github.com/square/crossfilter/issues/102#issuecomment-31570749).

<a name="group_reduceCount" href="#wiki-group_reduceCount">#</a> group.<b>reduceCount</b>()

A convenience method for setting the reduce functions to count records; returns this group.

<a name="group_reduceSum" href="#wiki-group_reduceSum">#</a> group.<b>reduceSum</b>(<i>value</i>)

A convenience method for setting the reduce functions to sum records using the specified *value* accessor function; returns this group. For example, to group payments by type and sum by total:

```js
var paymentsByType = payments.dimension(function(d) { return d.type; }),
    paymentVolumeByType = paymentsByType.group().reduceSum(function(d) { return d.total; }),
    topTypes = paymentVolumeByType.top(1);
topTypes[0].key; // the top payment type (e.g., "tab")
topTypes[0].value; // the payment volume for that type (e.g., 920)
```

<a name="group_order" href="#wiki-group_order">#</a> group.<b>order</b>(<i>orderValue</i>)

Specifies the order value for computing the [top-K](#wiki-group_top) groups. The default order is the identity function, which assumes that the reduction values are naturally-ordered (such as simple counts or sums). For example, to reduce both the count and sum simultaneously, and to order by sum:

```js
function reduceAdd(p, v) {
  ++p.count;
  p.total += v.total;
  return p;
}

function reduceRemove(p, v) {
  --p.count;
  p.total -= v.total;
  return p;
}

function reduceInitial() {
  return {count: 0, total: 0};
}

function orderValue(p) {
  return p.total;
}

var topTotals = paymentVolumeByType.reduce(reduceAdd, reduceRemove, reduceInitial).order(orderValue).top(2);
topTotals[0].key;   // payment type with highest total (e.g., "tab")
topTotals[0].value; // reduced value for that type (e.g., {count:8, total:920})
```

This technique can likewise be used to compute the number of unique values in each group, by storing a map from value to count within each group's reduction, and removing the value from the map when the count reaches zero.

<a name="group_orderNatural" href="#wiki-group_orderNatural">#</a> group.<b>orderNatural</b>()

A convenience method for using natural order for reduce values. Returns this grouping.

<a name="group_top" href="#wiki-group_top">#</a> group.<b>top</b>(<i>k</i>)

Returns a new array containing the top *k* groups, according to the [group order](#wiki-group_order) of the associated reduce value. The returned array is in descending order by reduce value. For example, to retrieve the top payment type by count:

```js
var paymentsByType = payments.dimension(function(d) { return d.type; }),
    paymentCountByType = paymentsByType.group(),
    topTypes = paymentCountByType.top(1);
topTypes[0].key; // the top payment type (e.g., "tab")
topTypes[0].value; // the count of payments of that type (e.g., 8)
```

If there are fewer than *k* groups according to all of the crossfilter's filters, then an array smaller than *k* will be returned. If there are fewer than *k* non-empty groups, this method may also return empty groups (those with zero selected records).

<a name="group_all" href="#wiki-group_all">#</a> group.<b>all</b>()

Returns the array of all groups, in ascending natural order by key. Like [top](#wiki-group_top), the returned objects contain `key` and `value` attributes. The returned array may also contain empty groups, whose value is the return value from the group's reduce *initial* function. For example, to count payments by type:

```js
var types = paymentCountByType.all();
```

This method is faster than top(Infinity) because the entire group array is returned as-is rather than selecting into a new array and sorting. Do not modify the returned array!

<a name="group_dispose" href="#wiki-group_dispose">#</a> group.<b>dispose</b>()

Removes this group from its dimension. This group will no longer update when new filters are applied to the crossfilter, and it may be garbage collected if there are no other references to it remaining.

## Group All (Reduce)

<a name="dimension_groupAll" href="#wiki-dimension_groupAll">#</a> dimension.<b>groupAll</b>()

A convenience function for grouping all records into a single group. The returned object is similar to a standard [grouping](#wiki-dimension_group), except it has no [top](#wiki-group_top) or [order](#wiki-group_order) methods. Instead, use [value](#wiki-groupAll_value) to retrieve the reduce value for all matching records.

Note: a grouping intersects the crossfilter's current filters, **except for the associated dimension's filter**. Thus, group methods consider only records that satisfy every filter except this dimension's filter. So, if the crossfilter of payments is filtered by type and total, then groupAll by total only observes the filter by type.

<a name="groupAll_reduce" href="#wiki-groupAll_reduce">#</a> groupAll.<b>reduce</b>(<i>add</i>, <i>remove</i>, <i>initial</i>)

Equivalent to [reduce](#wiki-group_reduce).

<a name="groupAll_value" href="#wiki-groupAll_value">#</a> groupAll.<b>value</b>()

Equivalent to [all()[0].value](#wiki-group_all).

## Extras

Crossfilter has a few extra goodies that you might find useful.

<a name="bisect" href="#wiki-bisect">#</a> crossfilter.<b>bisect</b>

The identity bisector; suitable for numbers, dates, strings, and other naturally-comparable objects.

<a name="bisect_by" href="#wiki-bisect">#</a> crossfilter.bisect.<b>by</b>(<i>value</i>)

Constructs a new bisector using the specified *value* accessor function, which must return a naturally-ordered value. For example, to bisect an array of objects by their property `foo`, say:

```js
var bisectByFoo = crossfilter.bisect.by(function(d) { return d.foo; });
```

The returned object is also the [bisect.right](#_bisect) function.

<a name="_bisect" href="#wiki-_bisect">#</a> <b>bisect</b>(<i>array</i>, <i>value</i>, <i>lo</i>, <i>hi</i>)<br>
<a name="bisect_right" href="#wiki-bisect_right">#</a> bisect.<b>right</b>(<i>array</i>, <i>value</i>, <i>lo</i>, <i>hi</i>)

Similar to [bisect.left](#bisect_left), but returns an insertion point which comes after (to the right of) any existing entries of *value* in *array*. The returned insertion point i partitions the *array* into two halves so that all v <= *value* for v in *array*.slice(*lo*, i) for the left side and all v > *value* for v in *array*.slice(i, *hi*) for the right side.

<a name="bisect_left" href="#wiki-bisect_left">#</a> bisect.<b>left</b>(<i>array</i>, <i>value</i>, <i>lo</i>, <i>hi</i>)

Locate the insertion point for *value* in *array* to maintain sorted order. The arguments *lo* and *hi* specify a subset of the array which should be considered; to search the entire array, use 0 and *array*.length, respectively. If *value* is already present in *array*, the insertion point will be before (to the left of) any existing entries. The return value is suitable for use as the first argument to [[splice|https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/splice]] assuming that *array* is already sorted. The returned insertion point i partitions the *array* into two halves so that all v < *value* for v in *array*.slice(*lo*, i) for the left side and all v >= *value* for v in *array*.slice(i, *hi*) for the right side.

<a name="heap" href="#wiki-heap">#</a> crossfilter.<b>heap</b>

The identity heap function; suitable for numbers, dates, strings, and other naturally-comparable objects.

<a name="heap_by" href="#wiki-heap_by">#</a> crossfilter.heap.<b>by</b>(<i>value</i>)

Constructs a new heap function using the specified *value* accessor function, which must return a naturally-ordered value. For example, to create a heap function for objects based on their property `foo`, say:

```js
var heapByFoo = crossfilter.heap.by(function(d) { return d.foo; });
```

The returned object is a [heap](#_heap) function.

<a name="_heap" href="#wiki-_heap">#</a> <b>heap</b>(<i>array</i>, <i>lo</i>, <i>hi</i>)

Reorders the specified subset of the *array* into a [binary heap](http://en.wikipedia.org/wiki/Binary_heap); the lower bound *lo* is an inclusive index, and the upper bound *hi* is an exclusive index. To convert the entire array into a heap, specify a *lo* of 0 and a *hi* of *array*.length.

<a name="heap_sort" href="#wiki-heap_sort">#</a> heap.<b>sort</b>(<i>array</i>, <i>lo</i>, <i>hi</i>)

Sorts the subset of the specified *array*, which must be a binary heap, **in descending order**; the lower bound *lo* is an inclusive index, and the upper bound *hi* is an exclusive index. To sort the entire heap, specify a *lo* of 0 and a *hi* of *array*.length.

<a name="heapselect" href="#wiki-heapselect">#</a> crossfilter.<b>heapselect</b>

The identity heapselect function; suitable for numbers, dates, strings, and other naturally-comparable objects.

<a name="heapselect_by" href="#wiki-heapselect_by">#</a> crossfilter.heapselect.<b>by</b>(<i>value</i>)

Constructs a new heapselect function using the specified *value* accessor function, which must return a naturally-ordered value. For example, to create a heapselect function for objects based on their property `foo`, say:

```js
var heapselectByFoo = crossfilter.heapselect.by(function(d) { return d.foo; });
```

The returned object is a [heapselect](#_heapselect) function.

<a name="_heapselect" href="#wiki-_heapselect">#</a> <b>heapselect</b>(<i>array</i>, <i>lo</i>, <i>hi</i>, <i>k</i>)

[Selects](http://en.wikipedia.org/wiki/Selection_algorithm) from the specified subset of the *array*, returning a new array containing the top *k* elements; the lower bound *lo* is an inclusive index, and the upper bound *hi* is an exclusive index. To select from the entire array, specify a *lo* of 0 and a *hi* of *array*.length.

<a name="insertionsort" href="#wiki-insertionsort">#</a> crossfilter.<b>insertionsort</b>

The identity insertionsort function; suitable for numbers, dates, strings, and other naturally-comparable objects. Note: you probably want to use [quicksort](#wiki-quicksort) instead.

<a name="_insertionsort" href="#wiki-_insertionsort">#</a> <b>insertionsort</b>(<i>array</i>, <i>lo</i>, <i>hi</i>)

Sorts the specified subset of the *array* in-place, returning the *array*; the lower bound *lo* is an inclusive index, and the upper bound *hi* is an exclusive index. To sort the entire array, specify a *lo* of 0 and a *hi* of *array*.length.

<a name="insertionsort_by" href="#wiki-insertionsort_by">#</a> crossfilter.insertionsort.<b>by</b>(<i>accessor</i>)

Constructs a new insertionsort function using the specified *value* accessor function, which must return a naturally-ordered value. For example, to create a insertionsort function for objects based on their property `foo`, say:

```js
var sortByFoo = crossfilter.insertionsort.by(function(d) { return d.foo; });
```

The returned object is an [insertionsort](#_insertionsort) function.

<a name="quicksort" href="#wiki-quicksort">#</a> crossfilter.<b>quicksort</b>

The identity quicksort function; suitable for numbers, dates, strings, and other naturally-comparable objects. This implementation uses Vladimir Yaroslavskiy’s dual-pivot quicksort algorithm, and switches to [insertionsort](#wiki-insertionsort) for small partitions.

<a name="_quicksort" href="#wiki-_quicksort">#</a> <b>quicksort</b>(<i>array</i>, <i>lo</i>, <i>hi</i>)

Sorts the specified subset of the *array* in-place, returning the *array*; the lower bound *lo* is an inclusive index, and the upper bound *hi* is an exclusive index. To sort the entire array, specify a *lo* of 0 and a *hi* of *array*.length.

<a name="quicksort_by" href="#wiki-quicksort_by">#</a> crossfilter.quicksort.<b>by</b>(<i>accessor</i>)

Constructs a new quicksort function using the specified *value* accessor function, which must return a naturally-ordered value. For example, to create a quicksort function for objects based on their property `foo`, say:

```js
var sortByFoo = crossfilter.quicksort.by(function(d) { return d.foo; });
```

The returned object is a [quicksort](#_quicksort) function.

<a name="permute" href="#wiki-permute">#</a> crossfilter.<b>permute</b>(<i>array</i>, <i>index</i>)

Returns a permutation of the specified *array* using the specified *index*. The returned array contains the corresponding element in *array* for each index in *index*, in order. For example, permute(["a", "b", "c"], [1, 2, 0])
returns ["b", "c", "a"]. It is acceptable for the array and index to be different lengths, and for indexes to be duplicated or omitted.
