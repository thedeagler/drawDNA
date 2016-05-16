/*
========================================
    Main JS for home.html
    Upgrades images after page load
========================================
*/

window.onload = function() {
  // Load gifs after page loads
  upgradeImages();
}

function upgradeImages() {
  var tutorialImages = [].slice.call(document.getElementsByClassName('tutorial_image'));

  tutorialImages.forEach(function(element) {
    var source = element.src;
    var newSourceBuilder = source.split('/');
    newSourceBuilder[4] = newSourceBuilder[4].replace('-small', '');
    element.src = newSourceBuilder.join('/');
  });

  // document.getElementById('background').style.backgroundImage = 'url(../resources/dnaBG.png)';
}
