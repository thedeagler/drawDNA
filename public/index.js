window.appState = {
  data: {
    dbn: '(...(((((.(...).)))))........(((((.....((..(.((((((..(((.((...)).)))..)))))).).))))))).............)',
    sequence: 'TTGGGGGGACTGGGGCTCCCATTCGTTGCCTTTATAAATCCTTGCAAGCCAATTAACAGGTTGGTGAGGGGCTTGGGTGAAAAGGTGCTTAAGACTCCGT',
  },
  selectedTab: '',
  selectedTabElement: null,
}


/*
========================================
    Register Event Listeners
========================================
 */
var createButton = document.getElementById('create_new');
createButton.addEventListener('click', function(e) {
  e.stopPropagation();
  console.log('Woah, new thing.');
})


/*
========================================
    Helpers
========================================
 */
function getD3Data(dbnString, sequenceString) {
  var nodes = sequenceString.toUpperCase().split('').map(function(base) { return {base: base}; });
  var links = [];
  var unpaired = [];

  dbnString.split('').forEach(function(db, i) {

    // if(i === 0) return;

    switch(db) {
      case '(':
        unpaired.push(i);
        break;
      case ')':
        links.push(new Link(unpaired.pop(), i));
        break;
      default :
        break;
    }

    if(i < nodes.length - 1) {
      links.push(new Link(i, i+1));
    }
  });

  return {
    nodes: nodes,
    links: links
  }

  function Link(source, target) {
    this.source = source;
    this.target = target;
  }
}

// Remove hidden class
function domShow(domElement) {
  domElement.classList.remove('hidden');
}

// Add hidden class
function domHide(domElement) {
  domElement.classList.add('hidden');
}
