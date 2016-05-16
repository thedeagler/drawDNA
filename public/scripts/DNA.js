/*
========================================
    DNA constructor
    D3 handled in DNA.prototype.draw
========================================
*/

function DNA(dbn, sequence) {
  this.sequence = sequence || '';
  this.dbn = dbn || '';
}

DNA.prototype.setSequence = function(sequence) {
  this.sequence = sequence;
}

DNA.prototype.setDbn = function(dbn) {
  this.dbn = dbn;
}

DNA.prototype.setDNA = function(newDNA) {
  this.dbn = newDNA.dbn;
  this.sequence = newDNA.sequence;
}

/*
========================================
    Draws the D3 Force graph
    Event handlers below
========================================
 */
DNA.prototype.draw = function() {
  var d3data = getD3Data(this);

  var width = window.innerWidth,
      height = window.innerHeight;

  var bases = d3data.nodes;
  var links = d3data.links;

  // Clear contents of SVG
  var loading = document.getElementById('loading');
  d3.select('#canvas').selectAll('g').remove();
  d3.select('#canvas').selectAll('line').remove();
  utils.domShow(loading);

  var svg = d3.select('#canvas')
    .attr('width', width)
    .attr('height', height);

  var linkDistance = 20;

  window.forceLayout = d3.layout.force() // Add to window so settings menu can change settings.
    .size([width, height])
    .nodes(bases)
    .links(links)
    .linkDistance(linkDistance)
    .linkStrength(2)
    .gravity(0.1)
    .charge(-200);

  var allLinks = svg.selectAll('.link')
    .data(links)
    .enter()
    .append('line')
    .attr('class', function(d, i) { return d.isPair ? 'pair' : 'link'; })
    .attr('x1', function(d) { return bases[d.source].x; })
    .attr('y1', function(d) { return bases[d.source].y; })
    .attr('x2', function(d) { return bases[d.target].x; })
    .attr('y2', function(d) { return bases[d.target].y; });

  var nodes = svg.selectAll('.node')
    .data(bases)
    .enter()
    .append('g')
    .on('click', nodeClick.call(this))
    .on('mouseenter', nodeMouseEnter.call(this))
    .on('mouseleave', nodeMouseLeave.call(this))
    .call(forceLayout.drag);

  var radius = 10;
  var fontSize = 1.8 * radius;
  nodes.append('circle')
    .attr('class', function(d, i) {
      switch(d.base.toUpperCase()) {
        case 'A': return 'clickable node adenine';
        case 'T': return 'clickable node thymine';
        case 'C': return 'clickable node cytosine';
        case 'G': return 'clickable node guanine';
        case "5'": return 'clickable node head';
        case "3'": return 'clickable node tail';
      }
    })
    .attr('r', function(d) {return d.r = radius; })
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; })
    .attr('fill', 'white')
    .attr('pointer-events', function(d, i) {
      if(i === 0 || i === bases.length - 1) return 'none';
    });

  nodes.append('text')
    .attr('font-size', function(d) { return d.fs = fontSize; })
    .attr('dx', function(d) { return d.dx = 12; })
    .attr('dy', '.35em')
    .text(function(d) { return d.base });

  var timeBetweenFrames = 1;
  forceLayout.on('tick', function() {
    nodes.attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; });

    allLinks.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

    if(forceLayout.alpha() < 0.012 && loading) {
      utils.domHide(loading);
      loading = null;
    }
  });

  forceLayout.start();

  /*
  ========================================
      D3 Event handlers
  ========================================
   */
  // Enlarges node and label
  var hoveredChar;
  function nodeMouseEnter() {
    return function(d, i) {
      var index = i - 1; // Because 5' is the 0th "node"
      hoveredChar = document.getElementById('i_' + index);
      if(hoveredChar) hoveredChar.style.outline = '2px solid #C324FF';

      d3.select(this.children[0])
        .transition()
        .attr("r", function(d) { return 1.3 * d.r; })
        .duration(50);
      d3.select(this.children[1])
        .transition()
        .attr('dx', function(d) { return 1.3 * d.dx; })
        .attr('font-size', function(d) { return 1.3 * d.fs; })
        .duration(50);
    }
  }

  // Unlargens node and label
  function nodeMouseLeave() {
    return function(d, i) {
      var index = i - 1; // Because 5' is the 0th node
      if(hoveredChar) {
        hoveredChar.style.outline = "none";
        hoveredChar = null;
      }

      d3.select(this.children[0])
        .transition()
        .attr('r', function(d) { return d.r; })
        .duration(50);
      d3.select(this.children[1])
        .transition()
        .attr('font-size',function(d) { return d.fs; })
        .attr('dx', function(d) { return d.dx; })
        .duration(50);
    }
  }

  // Creates links between nodes on click
  function nodeClick() {
    var selected = null;
    var basePairs = {A: 'T', T: 'A', C: 'G', G: 'C' };

    return function(d, i) {
      if (d3.event.defaultPrevented) return; // Mouse has dragged in this event, so don't consider a click

      if(selected === null) { // Nothing selected so far automatically makes selection
        selected = {
          d: d,
          classList: this.children[0].classList,
        };
        this.children[0].classList.add('selected_node');
      } else {
        if(selected.d === d) { // Same base selected will cancel the selection
          selected = null;
          this.children[0].classList.remove('selected_node');
        } else { // New base selected will attempt to make a pair
            var dbnArr = appState.DNA.dbn.split('');
            dbnArr[Math.min(selected.d.index - 1, i - 1)] = '(';
            dbnArr[Math.max(selected.d.index - 1, i - 1)] = ')';
            var newDBN = dbnArr.join('');

            var testDNA = {
              dbn: newDBN,
              sequence: appState.DNA.sequence,
            };

          try {
            utils.verifyDNA(testDNA)
            if(appState.DNA.dbn[selected.d.index - 1] !== '.'
              || appState.DNA.dbn[i - 1] !== '.') throw new Error();
            appState.DNA.setDbn(newDBN);

            var id = window.location.pathname.split('/')[2];
            var origin = window.location.origin;
            utils.makeRequest('POST', origin + '/data/' + id, function(err, data) {
              if(err) console.error('Error retrieving data:', err);
            }, JSON.stringify(appState.DNA));
            if(appState.selectedTab === 'dbn') {
              document.getElementById('tab_content').innerHTML = utils.createTabHTML(appState.DNA.dbn);
            }

            links.push({source: selected.d, target: d, isPair: true});

            allLinks = allLinks.data(links);
            allLinks.enter()
              .append('line')
              .attr('class', 'pair')
              .attr('x1', function(d) { return d.x; })
              .attr('y1', function(d) { return d.y; })
              .attr('x2', function(d) { return selected.d.x; })
              .attr('y2', function(d) { return selected.d.y; });
            allLinks.exit().remove();

            forceLayout.start();
          } catch(e) {
            var notifyArea = document.getElementById('notify');
            var notifyText = notifyArea.children[1];
            notifyText.innerText = "Unable to create base-pair link";

            notifyArea.classList.remove('slideOutDown');
            notifyArea.classList.add('bounceInUp');
            setTimeout(function() {
              notifyArea.classList.remove('bounceInUp');
              notifyArea.classList.add('slideOutDown');
            }, 3000);
          } finally {
            // Reset selected
            selected.classList.remove('selected_node');
            selected = null;
          }
        }
      }
    }
  }

  // Create data for d3 force graph
  function getD3Data(DNA) {
    var dbn = '.' + DNA.dbn + '.';
    var sequence = DNA.sequence;
    var links = [];
    var unpaired = [];
    var basePairs = {A: 'T', T: 'A', C: 'G', G: 'C' };
    var nodes = sequence.toUpperCase().split('').map(function(base) { return {base: base}; });

    // Add 5' and 3' markers if there is a string
    if(nodes.length) {
      nodes.unshift({base: "5'"});
      nodes.push({base: "3'"});
    }

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

}
