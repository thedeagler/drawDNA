function drawDNA(DNA) {
  var d3data = getD3Data(DNA);

  var width = window.innerWidth,
      height = window.innerHeight;

  var bases = d3data.nodes;
  var links = d3data.links;

  // Clear contents of SVG
  d3.select('#canvas').selectAll('g').remove();
  d3.select('#canvas').selectAll('line').remove();

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

  var nodes = svg.selectAll('.node')
    .data(bases)
    .enter()
    .append('g')
    .call(force.drag);

  var radius = 10;
  var fontSize = 1.8 * radius;
  nodes.append('circle')
    .attr('class', function(d, i) {
      switch(d.base.toUpperCase()) {
        case 'A': return 'node adenine';
        case 'T': return 'node thymine';
        case 'C': return 'node cytosine';
        case 'G': return 'node guanine';
        case "5'": return 'node head';
        case "3'": return 'node tail';
      }
    })
    .attr('r', radius)
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; })
    .attr('fill', 'white')
    .on('mouseover', function() {
      d3.select(this)
        .transition()
        .attr("r", 1.3 * radius)
        .duration(50);
      d3.select(this.nextSibling)
        .transition()
        .attr('dx', 12 + (0.4 * radius))
        .attr('font-size', 1.3 * fontSize)
        .duration(50);
    })
    .on('mouseout', function(){
      d3.select(this)
        .transition()
        .attr('r', radius)
        .duration(50);
      d3.select(this.nextSibling)
        .transition()
        .attr('font-size',fontSize)
        .attr('dx', 12)
        .duration(50);
    });

  nodes.append('text')
    .attr('font-size', fontSize)
    .attr('dx', 12)
    .attr('dy', '.35em')
    .text(function(d) { return d.base });

  var timeBetweenFrames = 1;
  force.on('tick', function() {
    nodes.attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; });

    allLinks.transition().ease('linear').duration(timeBetweenFrames)
      .attr('x1', function(d) { return d.source.x; })
      .attr('y1', function(d) { return d.source.y; })
      .attr('x2', function(d) { return d.target.x; })
      .attr('y2', function(d) { return d.target.y; });
  });

  force.start();
}

// Create data for d3 force graph
function getD3Data(DNA) {
  var dbn = '.' + DNA.dbn + '.';
  var sequence = DNA.sequence;
  var links = [];
  var unpaired = [];
  var basePairs = {A: 'T', T: 'A', C: 'G', G: 'C' };
  var nodes = sequence.toUpperCase().split('').map(function(base) { return {base: base}; });
  nodes.unshift({base: "5'"});
  nodes.push({base: "3'"});

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
