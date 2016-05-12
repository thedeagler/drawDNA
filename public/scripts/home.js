var toTutorialsButtons = Array.prototype.slice.call(document.getElementsByClassName('to_tutorials'));
toTutorialsButtons.forEach(function(button) {
  button.addEventListener('click', function(e) {
    smoothScroll('tutorials');
  });
})

function smoothScroll(eID) {
  var nextPos = currentYPosition();
  var stopY = elmYPosition(eID) - 40;
  var speed = 20;

  if(nextPos <= stopY) {
    var intervalID = setInterval(function() {
      if(nextPos >= stopY) clearInterval(intervalID);
      scrollTo(0, nextPos);
      nextPos += speed;
    }, 10);
  }
}

function currentYPosition() {
  // Firefox, Chrome, Opera, Safari
  if (self.pageYOffset) return self.pageYOffset;
  // Internet Explorer 6 - standards mode
  if (document.documentElement && document.documentElement.scrollTop)
    return document.documentElement.scrollTop;
  // Internet Explorer 6, 7 and 8
  if (document.body.scrollTop) return document.body.scrollTop;
  return 0;
}

function elmYPosition(eID) {
  var elm = document.getElementById(eID);
  var y = elm.offsetTop;
  var node = elm;
  while (node.offsetParent && node.offsetParent != document.body) {
    node = node.offsetParent;
    y += node.offsetTop;
  } return y;
}
