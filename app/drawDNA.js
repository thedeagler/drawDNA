// TODO: wrap this in a function so it can be called on updates
var x = getD3Data(appState.data.dbn, appState.data.sequence);

var width = window.innerWidth,
    height = window.innerHeight;

var bases = x.nodes;
var links = x.links;

var svg = d3.select('body').append('svg')
  .attr('width', width)
  .attr('height', height);

var linkDistance = 5;

var force = d3.layout.force()
  .size([width, height])
  .nodes(bases)
  .links(links)
  .linkDistance(linkDistance)
  .linkStrength(1)
  .charge(function(d, i) { return i%3 === 0 ? -400 : -120; });

var allLinks = svg.selectAll('.link')
  .data(links)
  .enter()
  .append('line')
  .attr('class', 'link')
  .attr('x1', function(d) { return bases[d.source].x; })
  .attr('y1', function(d) { return bases[d.source].y; })
  .attr('x2', function(d) { return bases[d.target].x; })
  .attr('y2', function(d) { return bases[d.target].y; });

var radius = 10;
var nodes = svg.selectAll('.node')
  .data(bases)
  .enter()
  .append('circle')
  .attr('class', 'node')
  .attr('r', radius)
  .attr('cx', function(d) { return d.x; })
  .attr('cy', function(d) { return d.y; })
  .call(force.drag);

var timeBetweenFrames = 1;
force.on('tick', function() {
  nodes.transition().ease('linear').duration(1)
    .attr('cx', function(d) { return d.x = Math.max(radius, Math.min(width - radius, d.x)); })
    .attr('cy', function(d) { return d.y = Math.max(radius, Math.min(height - radius, d.y)); });

  allLinks.transition().ease('linear').duration(1)
    .attr('x1', function(d) { return d.source.x; })
    .attr('y1', function(d) { return d.source.y; })
    .attr('x2', function(d) { return d.target.x; })
    .attr('y2', function(d) { return d.target.y; });
});

force.start();
