// Get interactive dom elements
var settingsContainer = document.getElementById('settings_container');
var gearIcon = document.getElementById('settings_icon');
var close = document.getElementById('settings_close');
var aColor = document.getElementById('a_color');
var tColor = document.getElementById('t_color');
var cColor = document.getElementById('c_color');
var gColor = document.getElementById('g_color');
var length = document.getElementById('length_slider');
var radius = document.getElementById('radius_slider');

/*
========================================
    Event listeners
========================================
 */
gearIcon.addEventListener('click', function(e) {
  e.preventDefault();
  e.stopPropagation();

  aColor.addEventListener('change', changeColor('adenine'));
  tColor.addEventListener('change', changeColor('thymine'));
  cColor.addEventListener('change', changeColor('cytosine'));
  gColor.addEventListener('change', changeColor('guanine'));
  length.addEventListener('input', changeLength);
  radius.addEventListener('input', changeRadius);

  close.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    aColor.removeEventListener('change', changeColor('adenine'));
    tColor.removeEventListener('change', changeColor('thymine'));
    cColor.removeEventListener('change', changeColor('cytosine'));
    gColor.removeEventListener('change', changeColor('guanine'));

    domHide(settingsContainer);
    domShow(gearIcon);
  });

  domShow(settingsContainer);
  domHide(gearIcon);
});


/*
========================================
    Event Handlers
========================================
 */

/*
========================================
    Util
========================================
 */
function changeColor(base) {
  return function(e) {
    d3.selectAll('.' + base)
      .style('fill', e.target.value)
      .style('stroke', e.target.value);
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
