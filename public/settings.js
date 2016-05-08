// Get interactive dom elements
var settings = document.getElementById('settings_container');
var open = document.getElementById('settings_open');
var close = document.getElementById('settings_close');
var legend = document.getElementById('legend_container');
var aColor = document.getElementById('a_color');
var tColor = document.getElementById('t_color');
var cColor = document.getElementById('c_color');
var gColor = document.getElementById('g_color');
var aOut = document.getElementById('a_output');
var tOut = document.getElementById('t_output');
var cOut = document.getElementById('c_output');
var gOut = document.getElementById('g_output');
var length = document.getElementById('length_slider');
var radius = document.getElementById('radius_slider');

/*
========================================
    Event listeners
========================================
 */
open.addEventListener('click', showSettings);


/*
========================================
    Main
========================================
 */
appState.colorBubbles = {
  adenine: document.getElementById('a_output'),
  thymine: document.getElementById('t_output'),
  cytosine: document.getElementById('c_output'),
  guanine: document.getElementById('g_output'),
}

/*
========================================
    Event Handlers
========================================
 */
function showSettings(e) {
  e.preventDefault();
  e.stopPropagation();

  aColor.addEventListener('change', changeColor('adenine'));
  tColor.addEventListener('change', changeColor('thymine'));
  cColor.addEventListener('change', changeColor('cytosine'));
  gColor.addEventListener('change', changeColor('guanine'));
  length.addEventListener('input', changeLength);
  radius.addEventListener('input', changeRadius);

  open.removeEventListener('click', showSettings);
  close.addEventListener('click', hideSettings);

  domShow(settings);
  domHide(legend);
}

function hideSettings(e) {
  e.preventDefault();
  e.stopPropagation();

  aColor.removeEventListener('change', changeColor('adenine'));
  tColor.removeEventListener('change', changeColor('thymine'));
  cColor.removeEventListener('change', changeColor('cytosine'));
  gColor.removeEventListener('change', changeColor('guanine'));
  length.removeEventListener('input', changeLength);
  radius.removeEventListener('input', changeRadius);

  open.addEventListener('click', showSettings);
  close.removeEventListener('click', hideSettings);

  domHide(settings);
  domShow(legend);
}

/*
========================================
    Utilities
========================================
 */
function changeColor(base) {
  return function(e) {
    var color = e.target.value;
    appState.colorBubbles[base].style.backgroundColor = color;

    d3.selectAll('.' + base)
      .style('fill', color)
      .style('stroke', color);
  }
}

function changeLength(e) {
  forceLayout.stop()
    .linkDistance((e.target.value / 2))
    .start();
}

function changeRadius(e) {
  var radius = e.target.value;

  d3.selectAll('circle')
    .attr('r', function(d) {
      d3.select(this.nextSibling)
        .attr('dx', function(d) { return d.dx = (1.2 * radius); })
        .attr('font-size', function(d) { return d.fs = (1.8 * radius); })
      return d.r = radius;
    });
}
