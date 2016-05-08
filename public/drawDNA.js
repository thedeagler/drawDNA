function drawDNA(dbn, sequence) {
  var d3data = getD3Data(dbn, sequence);

  var width = window.innerWidth,
      height = window.innerHeight;

  var bases = d3data.nodes;
  var links = d3data.links;

  // Clear contents of SVG
  d3.select('#canvas').selectAll('*').remove();

  var svg = d3.select('#canvas')
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
}

// Create data for d3 force graph
function getD3Data(DNA) {
  var dbn = DNA.dbn;
  var sequence = DNA.sequence;
  var nodes = sequence.toUpperCase().split('').map(function(base) { return {base: base}; });
  var links = [];
  var unpaired = [];
  var basePairs = {A: 'T', T: 'A', C: 'G', G: 'C' };

  dbn.split('').forEach(function(db, i) {
    switch(db) {
      case '.':
        break;
      case '(':
        unpaired.push(i);
        break;
      case ')':
        links.push(new Link(unpaired.pop(), i, true));
        break;
      default: break;
    };

    if(i < nodes.length - 1) {
      links.push(new Link(i, i+1));
    }
  });

  return {
    nodes: nodes,
    links: links
  }

  function Link(source, target, isPair) {
    this.source = source;
    this.target = target;
    this.isPair = isPair || false;
  }
}
