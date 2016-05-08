// Get interactive dom elements
var settingsContainer = document.getElementById('settings_container');
var gearIcon = document.getElementById('settings_icon');
var close = document.getElementById('settings_close');
var aColor = document.getElementById('a_color');
var tColor = document.getElementById('t_color');
var cColor = document.getElementById('c_color');
var gColor = document.getElementById('g_color');

/*
========================================
    Register event listeners
    All initially exposed listeners registered here.
    Nested listeners are registered in the nested component
========================================
 */
gearIcon.addEventListener('click', function(e) {
  e.preventDefault();
  e.stopPropagation();

  aColor.addEventListener('change', changeColor('adenine'));
  tColor.addEventListener('change', changeColor('thymine'));
  cColor.addEventListener('change', changeColor('cytosine'));
  gColor.addEventListener('change', changeColor('guanine'));

  close.addEventListener('click', function() {
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
