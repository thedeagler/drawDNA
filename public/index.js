/*
========================================
    State
========================================
 */
window.appState = {
  DNA: {
    dbn: '',
    sequence: '',
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
    Main
========================================
 */
// Get sequence data on page load
var id = window.location.pathname.split('/')[2];
makeRequest('GET', 'http://127.0.0.1:3000/data/' + id);

/*
========================================
    Helpers
========================================
 */
// Update app's DNA state
function updateDNA(newDNA) {
  verifyDNA(newDNA);
  appState.DNA = newDNA;
}

// Check validity of input sequences
// Throws specific errors about what's wrong
// Returns true if valid
function verifyDNA(DNA) {
  var dbn = DNA.dbn;
  var sequence = DNA.sequence;
  var unpaired = [];
  var basePairs = {A: 'T', T: 'A', C: 'G', G: 'C' };
  var errMap = {};

  var nodes = sequence.toUpperCase().split('').map(function(base) {
    if(!basePairs.hasOwnProperty(base) && !errMap[1]) errMap[1] = 'Unexpected value in sequence.';
    return {base: base};
  });

  if(dbn.length !== sequence.length && !errMap[3]) errMap[3] = "Sequence and dot-bracket notation mismatch.";
  dbn.split('').forEach(function(db, i) {
    switch(db) {
      case '.':
        break;
      case '(':
        unpaired.push(i);
        break;
      case ')':
        var pair = unpaired.pop();
        if(basePairs[nodes[i].base] !== nodes[pair].base && !errMap[2]) errMap[2] = 'Mismatched base pair.';
        break;
      default:
        if(!errMap[0]) errMap[0] = 'Unexpected value in dot-bracket notation.';
    };
  });
  if(unpaired.length  && !errMap[4]) errMap[4] = 'Unpaired bases remaining.';

  var errors = [];
  for(error in errMap) {
    errors.push(errMap[error]);
  }

  if(errors.length) {
    throw new DNAError(errors);
  } else {
    return true;
  }
}

// Make Ajax requests
var httpRequest;
function makeRequest(type, url, data) {
  httpRequest = new XMLHttpRequest();

  if (!httpRequest) {
    alert('Giving up :( Cannot create an XMLHTTP instance');
    return false;
  }
  httpRequest.onreadystatechange = handleResponse;
  httpRequest.open(type, url);
  httpRequest.send(data);
}

function handleResponse() {
  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    if (httpRequest.status === 200) {
      var response = JSON.parse(httpRequest.responseText);

      appState.DNA.dbn = response.dbn;
      appState.DNA.sequence = response.baseChain;

      drawDNA(appState.DNA);
    } else {
      console.log('There was a problem with the request.');
    }
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
