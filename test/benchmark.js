var crossfilter = require("../"),
    d3 = require("d3");

var then,
    then2;

// Various generators for our synthetic dataset.
var firstSize = 9e4,
    secondSize = 1e4,
    totalSize = firstSize + secondSize,
    randomDayOfWeek = randomIndex([0, .6, .7, .75, .8, .76, 0]),
    randomHourOfDay = randomIndex([0, 0, 0, 0, 0, 0, 0, .2, .5, .7, .85, .9, .8, .69, .72, .8, .78, .7, .3, 0, 0, 0, 0, 0]),
    randomDate = randomRecentDate(randomDayOfWeek, randomHourOfDay, 13),
    randomAmount = randomLogNormal(2.5, .5),
    randomPayment = function() { return {date: randomDate(), amount: randomAmount()}; };

// Various formatters to show our synthetic distributions.
var x = d3.scale.linear().rangeRound([0, 20]),
    dayNames = ["S", "M", "T", "W", "T", "F", "S"],
    formatNumber = d3.format(",.02r"),
    formatInteger = d3.format("8d"),
    formatDate = d3.time.format("%x"),
    formatDay = function(i) { return dayNames[i]; };

// Create the synthetic records.
then = Date.now();
var paymentRecords = d3.range(totalSize).map(randomPayment);
console.log("Synthesizing " + formatNumber(totalSize) + " records: " + formatNumber(Date.now() - then) + "ms.");

// Slice the records into batches so we can measure incremental add.
var firstBatch = paymentRecords.slice(0, firstSize),
    secondBatch = paymentRecords.slice(firstSize);

// Create the crossfilter and relevant dimensions and groups.
then = then2 = Date.now();
var payments = crossfilter(firstBatch),
    all = payments.groupAll(),
    amount = payments.dimension(function(d) { return d.amount; }),
    amounts = amount.group(Math.floor),
    date = payments.dimension(function(d) { return d.date; }),
    dates = date.group(d3.time.day),
    day = payments.dimension(function(d) { return d.date.getDay(); }),
    days = day.group(),
    hour = payments.dimension(function(d) { return d.date.getHours(); }),
    hours = hour.group();
console.log("Indexing " + formatNumber(firstSize) + " records: " + formatNumber(Date.now() - then) + "ms.");

// Add the second batch incrementally.
then = Date.now();
payments.add(secondBatch);
console.log("Indexing " + formatNumber(secondSize) + " records: " + formatNumber(Date.now() - then) + "ms.");
console.log("Total indexing time: " + formatNumber(Date.now() - then2) + "ms.");
console.log("");

// Simulate filtering by dates.
then = Date.now();
var today = d3.time.day(new Date());
for (var i = 0, n = 90, k = 0; i < n; ++i) {
  var ti = d3.time.day.offset(today, -i);
  for (var j = 0; j < i; ++j) {
    var tj = d3.time.day.offset(today, -j);
    date.filterRange([ti, tj]);
    updateDisplay();
  }
}
console.log("Filtering by date: " + formatNumber((Date.now() - then) / k) + "ms/op.");
date.filterAll();

// Simulate filtering by day.
then = Date.now();
for (var i = 0, n = 7, k = 0; i < n; ++i) {
  for (var j = i; j < n; ++j) {
    day.filterRange([i, j]);
    updateDisplay();
  }
}
console.log("Filtering by day: " + formatNumber((Date.now() - then) / k) + "ms/op.");
day.filterAll();

// Simulate filtering by hour.
then = Date.now();
for (var i = 0, n = 24, k = 0; i < n; ++i) {
  for (var j = i; j < n; ++j) {
    hour.filterRange([i, j]);
    updateDisplay();
  }
}
console.log("Filtering by hour: " + formatNumber((Date.now() - then) / k) + "ms/op.");
hour.filterAll();

// Simulate filtering by amount.
then = Date.now();
for (var i = 0, n = 35, k = 0; i < n; ++i) {
  for (var j = i; j < n; ++j) {
    amount.filterRange([i, j]);
    updateDisplay();
  }
}
console.log("Filtering by amount: " + formatNumber((Date.now() - then) / k) + "ms/op.");
amount.filterAll();

console.log("");
console.log("Day of Week:");
x.domain([0, days.top(1)[0].value]);
days.all().forEach(function(g) {
  console.log("       " + formatDay(g.key) + ": " + new Array(x(g.value) + 1).join("▇"));
});
console.log("");

console.log("Hour of Day:");
x.domain([0, hours.top(1)[0].value]);
hours.all().forEach(function(g) {
  console.log(formatInteger(g.key) + ": " + new Array(x(g.value) + 1).join("▇"));
});
console.log("");

console.log("Date:");
x.domain([0, dates.top(1)[0].value]);
dates.all().forEach(function(g) {
  console.log(formatDate(g.key) + ": " + new Array(x(g.value) + 1).join("▇"));
});
console.log("");

console.log("Amount:");
x.domain([0, amounts.top(1)[0].value]);
amounts.all().filter(function(g) { return x(g.value); }).forEach(function(g) {
  console.log(formatInteger(g.key) + ": " + new Array(x(g.value) + 1).join("▇"));
});
console.log("");

// Simulates updating the display whenever the filters change.
function updateDisplay() {
  dates.all(); // update the date chart
  days.all(); // update the day-of-week chart
  hours.all(); // update the hour-of-day chart
  amounts.all(); // update the amount histogram
  all.value(); // update the summary totals
  date.top(40); // update the payment list
  ++k; // count frame rate
}

// Returns a function that returns random index in [0, distribution.length -
// 1], based on the relative values in the specified distribution. Internally,
// the distribution is converted to a normalized cumulative distribution in
// [0, 1], and then a uniform random value is used with bisection.
function randomIndex(distribution) {
  var k = 1 / d3.sum(distribution), s = 0;
  for (var i = 0, n = distribution.length; i < n; ++i) {
    s = (distribution[i] = distribution[i] * k + s);
  }
  return function() {
    return d3.bisectLeft(distribution, Math.random());
  };
}

// Returns a function that returns random values with a log-normal
// distribution, with the specified mean and deviation.
function randomLogNormal(µ, σ) {
  var random = d3.random.normal();
  return function() {
    return Math.exp(µ + σ * random());
  };
}

// Returns a function that returns random dates, built on top of the specified
// random day-of-week and hour-of-day generators. The minutes, seconds, and
// milliseconds of the return dates are uniform random; as is the week of the
// returned date, which is between now and some *weeks* ago.
function randomRecentDate(randomDayOfWeek, randomHourOfDay, weeks) {
  var now = Date.now();
  return function() {
    var d = d3.time.week.offset(new Date(), -Math.floor(Math.random() * weeks));
    d.setDate(d.getDate() + randomDayOfWeek() - d.getDay());
    d.setHours(randomHourOfDay(), Math.random() * 60, Math.random() * 60, Math.random() * 1000);
    return d;
  };
}
