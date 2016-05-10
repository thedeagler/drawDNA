function LinkMaker() {
  this.source = null;
  this.target = null;
}

LinkMaker.prototype.onClick = function(data, index) {
  if(this.source === null) {
    this.source = index;
  } else {
    if(this.source === index)
  }

  if(this.target === null) {
    this.target = index;
  }

  if(this.nodes.hasOwnProperty(index)) {
    delete this.nodes[index];
    this.children[0].classList.remove('makelink');
  } else {
    if(Object.keys(this.nodes).length < 2) {
      this.nodes[index] = data;
      this.children[0].classList.add('makelink');
    }
  }
}

LinkMaker.prototype.makeLink = function() {

}

(function() {
      var selected = {};

      return function(d, i) {
        if(selected.hasOwnProperty(i)) {
          delete selected[i];
          this.children[0].classList.remove('makelink');
        } else {
          if(Object.keys(selected).length < 2) {
            selected[i] = d;
            this.children[0].classList.add('makelink');
          }
        }

      }
    })())
