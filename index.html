<!DOCTYPE html>
<meta charset="utf-8">
<title>Crossfilter</title>
<style>

@import url(http://fonts.googleapis.com/css?family=Yanone+Kaffeesatz:400,700);

body {
  font-family: "Helvetica Neue";
  margin: 40px auto;
  width: 960px;
  min-height: 2000px;
}

#body {
  position: relative;
}

footer {
  padding: 2em 0 1em 0;
  font-size: 12px;
}

h1 {
  font-size: 96px;
  margin-top: .3em;
  margin-bottom: 0;
}

h1 + h2 {
  margin-top: 0;
}

h2 {
  font-weight: 400;
  font-size: 28px;
}

h1, h2 {
  font-family: "Yanone Kaffeesatz";
  text-rendering: optimizeLegibility;
}

#body > p {
  line-height: 1.5em;
  width: 640px;
  text-rendering: optimizeLegibility;
}

#charts {
  padding: 10px 0;
}

.chart {
  display: inline-block;
  height: 151px;
  margin-bottom: 20px;
}

.reset {
  padding-left: 1em;
  font-size: smaller;
  color: #ccc;
}

.background.bar {
  fill: #ccc;
}

.foreground.bar {
  fill: steelblue;
}

.axis path, .axis line {
  fill: none;
  stroke: #000;
  shape-rendering: crispEdges;
}

.axis text {
  font: 10px sans-serif;
}

.brush rect.extent {
  fill: steelblue;
  fill-opacity: .125;
}

.brush .resize path {
  fill: #eee;
  stroke: #666;
}

#hour-chart {
  width: 260px;
}

#delay-chart {
  width: 230px;
}

#distance-chart {
  width: 420px;
}

#date-chart {
  width: 920px;
}

#flight-list {
  min-height: 1024px;
}

#flight-list .date,
#flight-list .day {
  margin-bottom: .4em;
}

#flight-list .flight {
  line-height: 1.5em;
  background: #eee;
  width: 640px;
  margin-bottom: 1px;
}

#flight-list .time {
  color: #999;
}

#flight-list .flight div {
  display: inline-block;
  width: 100px;
}

#flight-list div.distance,
#flight-list div.delay {
  width: 160px;
  padding-right: 10px;
  text-align: right;
}

#flight-list .early {
  color: green;
}

aside {
  position: absolute;
  left: 740px;
  font-size: smaller;
  width: 220px;
}

</style>

<div id="body">

<a href="https://github.com/square"><img src="logotype.png" width="122" height="31"></a>

<h1>Crossfilter</h1>

<h2>Fast Multidimensional Filtering for Coordinated Views</h2>

<p><b>Crossfilter</b> is a <a href="https://github.com/square/crossfilter">JavaScript library</a> for exploring large multivariate datasets in the browser. Crossfilter supports extremely fast (&lt;30ms) interaction with coordinated views, even with datasets containing a million or more records; we built it to power analytics for <a href="https://squareup.com/register">Square Register</a>, allowing merchants to slice and dice their payment history fluidly.

<p>Since most interactions only involve a single dimension, and then only small adjustments are made to the filter values, incremental filtering and reducing is significantly faster than starting from scratch. Crossfilter uses sorted indexes (and a few bit-twiddling hacks) to make this possible, dramatically increasing the perfor&shy;mance of live histograms and top-<i>K</i> lists. For more details on how Crossfilter works, see the <a href="https://github.com/square/crossfilter/wiki/API-Reference">API reference</a>.

<h2>Example: Airline on-time performance</h2>

<p>The coordinated visualizations below (built with <a href="http://mbostock.github.com/d3/">D3</a>) show nearly a quarter-million flights from early 2001: part of the <a href="http://stat-computing.org/dataexpo/2009/">ASA Data Expo</a> dataset. The dataset is 5.3MB, so it might take a few seconds to download. Click and drag on any chart to filter by the associated dimension. The table beneath shows the eighty most recent flights that match the current filters; these are the <i>details on demand</i>, anecdotal evidence you can use to weigh different hypotheses.

<p>Some questions to consider: How does time-of-day correlate with <a href="javascript:filter([null, [100, 150], null, null])">arrival delay</a>? Are <a href="javascript:filter([null, null, [1700, 2000], null])">longer</a> or <a href="javascript:filter([null, null, [0, 300], null])">shorter</a> flights more likely to arrive early? What happened on <a href="javascript:filter([null, [80, 150], null, [new Date(2001, 0, 12), new Date(2001, 0, 13)]])">January 12</a>? How do flight patterns differ between <a href="javascript:filter([null, null, null, [new Date(2001, 0, 27), new Date(2001, 0, 29)]])">weekends</a> and <a href="javascript:filter([null, null, null, [new Date(2001, 0, 29), new Date(2001, 1, 3)]])">weekdays</a>, or <a href="javascript:filter([[4, 7], null, null, null])">mornings</a> and <a href="javascript:filter([[21, 24], null, null, null])">nights</a>? <a href="https://github.com/square/crossfilter/tree/gh-pages">Fork this example</a> and try your own data!

<div id="charts">
  <div id="hour-chart" class="chart">
    <div class="title">Time of Day</div>
  </div>
  <div id="delay-chart" class="chart">
    <div class="title">Arrival Delay (min.)</div>
  </div>
  <div id="distance-chart" class="chart">
    <div class="title">Distance (mi.)</div>
  </div>
  <div id="date-chart" class="chart">
    <div class="title">Date</div>
  </div>
</div>

<aside id="totals"><span id="active">-</span> of <span id="total">-</span> flights selected.</aside>

<div id="lists">
  <div id="flight-list" class="list"></div>
</div>

<footer>
  <span style="float:right;">
    Released under the <a href="http://www.apache.org/licenses/LICENSE-2.0.html">Apache License 2.0</a>.
  </span>
  Copyright 2012 <a href="http://squareup.com">Square, Inc.</a>
</footer>

</div>

<a href="https://github.com/square/crossfilter"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png" alt="Fork me on GitHub"></a>

<script src="crossfilter.v1.min.js"></script>
<script src="d3.v3.min.js"></script>
<script>

// (It's CSV, but GitHub Pages only gzip's JSON at the moment.)
d3.csv("flights-3m.json", function(error, flights) {

  // Various formatters.
  var formatNumber = d3.format(",d"),
      formatChange = d3.format("+,d"),
      formatDate = d3.time.format("%B %d, %Y"),
      formatTime = d3.time.format("%I:%M %p");

  // A nest operator, for grouping the flight list.
  var nestByDate = d3.nest()
      .key(function(d) { return d3.time.day(d.date); });

  // A little coercion, since the CSV is untyped.
  flights.forEach(function(d, i) {
    d.index = i;
    d.date = parseDate(d.date);
    d.delay = +d.delay;
    d.distance = +d.distance;
  });

  // Create the crossfilter for the relevant dimensions and groups.
  var flight = crossfilter(flights),
      all = flight.groupAll(),
      date = flight.dimension(function(d) { return d.date; }),
      dates = date.group(d3.time.day),
      hour = flight.dimension(function(d) { return d.date.getHours() + d.date.getMinutes() / 60; }),
      hours = hour.group(Math.floor),
      delay = flight.dimension(function(d) { return Math.max(-60, Math.min(149, d.delay)); }),
      delays = delay.group(function(d) { return Math.floor(d / 10) * 10; }),
      distance = flight.dimension(function(d) { return Math.min(1999, d.distance); }),
      distances = distance.group(function(d) { return Math.floor(d / 50) * 50; });

  var charts = [

    barChart()
        .dimension(hour)
        .group(hours)
      .x(d3.scale.linear()
        .domain([0, 24])
        .rangeRound([0, 10 * 24])),

    barChart()
        .dimension(delay)
        .group(delays)
      .x(d3.scale.linear()
        .domain([-60, 150])
        .rangeRound([0, 10 * 21])),

    barChart()
        .dimension(distance)
        .group(distances)
      .x(d3.scale.linear()
        .domain([0, 2000])
        .rangeRound([0, 10 * 40])),

    barChart()
        .dimension(date)
        .group(dates)
        .round(d3.time.day.round)
      .x(d3.time.scale()
        .domain([new Date(2001, 0, 1), new Date(2001, 3, 1)])
        .rangeRound([0, 10 * 90]))
        .filter([new Date(2001, 1, 1), new Date(2001, 2, 1)])

  ];

  // Given our array of charts, which we assume are in the same order as the
  // .chart elements in the DOM, bind the charts to the DOM and render them.
  // We also listen to the chart's brush events to update the display.
  var chart = d3.selectAll(".chart")
      .data(charts)
      .each(function(chart) { chart.on("brush", renderAll).on("brushend", renderAll); });

  // Render the initial lists.
  var list = d3.selectAll(".list")
      .data([flightList]);

  // Render the total.
  d3.selectAll("#total")
      .text(formatNumber(flight.size()));

  renderAll();

  // Renders the specified chart or list.
  function render(method) {
    d3.select(this).call(method);
  }

  // Whenever the brush moves, re-rendering everything.
  function renderAll() {
    chart.each(render);
    list.each(render);
    d3.select("#active").text(formatNumber(all.value()));
  }

  // Like d3.time.format, but faster.
  function parseDate(d) {
    return new Date(2001,
        d.substring(0, 2) - 1,
        d.substring(2, 4),
        d.substring(4, 6),
        d.substring(6, 8));
  }

  window.filter = function(filters) {
    filters.forEach(function(d, i) { charts[i].filter(d); });
    renderAll();
  };

  window.reset = function(i) {
    charts[i].filter(null);
    renderAll();
  };

  function flightList(div) {
    var flightsByDate = nestByDate.entries(date.top(40));

    div.each(function() {
      var date = d3.select(this).selectAll(".date")
          .data(flightsByDate, function(d) { return d.key; });

      date.enter().append("div")
          .attr("class", "date")
        .append("div")
          .attr("class", "day")
          .text(function(d) { return formatDate(d.values[0].date); });

      date.exit().remove();

      var flight = date.order().selectAll(".flight")
          .data(function(d) { return d.values; }, function(d) { return d.index; });

      var flightEnter = flight.enter().append("div")
          .attr("class", "flight");

      flightEnter.append("div")
          .attr("class", "time")
          .text(function(d) { return formatTime(d.date); });

      flightEnter.append("div")
          .attr("class", "origin")
          .text(function(d) { return d.origin; });

      flightEnter.append("div")
          .attr("class", "destination")
          .text(function(d) { return d.destination; });

      flightEnter.append("div")
          .attr("class", "distance")
          .text(function(d) { return formatNumber(d.distance) + " mi."; });

      flightEnter.append("div")
          .attr("class", "delay")
          .classed("early", function(d) { return d.delay < 0; })
          .text(function(d) { return formatChange(d.delay) + " min."; });

      flight.exit().remove();

      flight.order();
    });
  }

  function barChart() {
    if (!barChart.id) barChart.id = 0;

    var margin = {top: 10, right: 10, bottom: 20, left: 10},
        x,
        y = d3.scale.linear().range([100, 0]),
        id = barChart.id++,
        axis = d3.svg.axis().orient("bottom"),
        brush = d3.svg.brush(),
        brushDirty,
        dimension,
        group,
        round;

    function chart(div) {
      var width = x.range()[1],
          height = y.range()[0];

      y.domain([0, group.top(1)[0].value]);

      div.each(function() {
        var div = d3.select(this),
            g = div.select("g");

        // Create the skeletal chart.
        if (g.empty()) {
          div.select(".title").append("a")
              .attr("href", "javascript:reset(" + id + ")")
              .attr("class", "reset")
              .text("reset")
              .style("display", "none");

          g = div.append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
            .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

          g.append("clipPath")
              .attr("id", "clip-" + id)
            .append("rect")
              .attr("width", width)
              .attr("height", height);

          g.selectAll(".bar")
              .data(["background", "foreground"])
            .enter().append("path")
              .attr("class", function(d) { return d + " bar"; })
              .datum(group.all());

          g.selectAll(".foreground.bar")
              .attr("clip-path", "url(#clip-" + id + ")");

          g.append("g")
              .attr("class", "axis")
              .attr("transform", "translate(0," + height + ")")
              .call(axis);

          // Initialize the brush component with pretty resize handles.
          var gBrush = g.append("g").attr("class", "brush").call(brush);
          gBrush.selectAll("rect").attr("height", height);
          gBrush.selectAll(".resize").append("path").attr("d", resizePath);
        }

        // Only redraw the brush if set externally.
        if (brushDirty) {
          brushDirty = false;
          g.selectAll(".brush").call(brush);
          div.select(".title a").style("display", brush.empty() ? "none" : null);
          if (brush.empty()) {
            g.selectAll("#clip-" + id + " rect")
                .attr("x", 0)
                .attr("width", width);
          } else {
            var extent = brush.extent();
            g.selectAll("#clip-" + id + " rect")
                .attr("x", x(extent[0]))
                .attr("width", x(extent[1]) - x(extent[0]));
          }
        }

        g.selectAll(".bar").attr("d", barPath);
      });

      function barPath(groups) {
        var path = [],
            i = -1,
            n = groups.length,
            d;
        while (++i < n) {
          d = groups[i];
          path.push("M", x(d.key), ",", height, "V", y(d.value), "h9V", height);
        }
        return path.join("");
      }

      function resizePath(d) {
        var e = +(d == "e"),
            x = e ? 1 : -1,
            y = height / 3;
        return "M" + (.5 * x) + "," + y
            + "A6,6 0 0 " + e + " " + (6.5 * x) + "," + (y + 6)
            + "V" + (2 * y - 6)
            + "A6,6 0 0 " + e + " " + (.5 * x) + "," + (2 * y)
            + "Z"
            + "M" + (2.5 * x) + "," + (y + 8)
            + "V" + (2 * y - 8)
            + "M" + (4.5 * x) + "," + (y + 8)
            + "V" + (2 * y - 8);
      }
    }

    brush.on("brushstart.chart", function() {
      var div = d3.select(this.parentNode.parentNode.parentNode);
      div.select(".title a").style("display", null);
    });

    brush.on("brush.chart", function() {
      var g = d3.select(this.parentNode),
          extent = brush.extent();
      if (round) g.select(".brush")
          .call(brush.extent(extent = extent.map(round)))
        .selectAll(".resize")
          .style("display", null);
      g.select("#clip-" + id + " rect")
          .attr("x", x(extent[0]))
          .attr("width", x(extent[1]) - x(extent[0]));
      dimension.filterRange(extent);
    });

    brush.on("brushend.chart", function() {
      if (brush.empty()) {
        var div = d3.select(this.parentNode.parentNode.parentNode);
        div.select(".title a").style("display", "none");
        div.select("#clip-" + id + " rect").attr("x", null).attr("width", "100%");
        dimension.filterAll();
      }
    });

    chart.margin = function(_) {
      if (!arguments.length) return margin;
      margin = _;
      return chart;
    };

    chart.x = function(_) {
      if (!arguments.length) return x;
      x = _;
      axis.scale(x);
      brush.x(x);
      return chart;
    };

    chart.y = function(_) {
      if (!arguments.length) return y;
      y = _;
      return chart;
    };

    chart.dimension = function(_) {
      if (!arguments.length) return dimension;
      dimension = _;
      return chart;
    };

    chart.filter = function(_) {
      if (_) {
        brush.extent(_);
        dimension.filterRange(_);
      } else {
        brush.clear();
        dimension.filterAll();
      }
      brushDirty = true;
      return chart;
    };

    chart.group = function(_) {
      if (!arguments.length) return group;
      group = _;
      return chart;
    };

    chart.round = function(_) {
      if (!arguments.length) return round;
      round = _;
      return chart;
    };

    return d3.rebind(chart, brush, "on");
  }
});

</script>
