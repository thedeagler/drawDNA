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
var origin = window.location.origin;
makeRequest('GET', origin + '/data/' + id);

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
  var errMap = {};

  var basePairs = {A: 'T', T: 'A', C: 'G', G: 'C' };
  var errCodes = {
    0: 'Unexpected value in dot-bracket notation.',
    1: 'Unexpected value in sequence.',
    2: 'Mismatched base pair.',
    3: 'Sequence/dot-bracket notation mismatch.',
    4: 'Unpaired bases.',
    5: 'Illegal dot-bracket notation.'
  }

  var bases = sequence.toUpperCase().split('').map(function(base) {
    if(!basePairs.hasOwnProperty(base)) generateError(1);
    return {base: base};
  });

  if(dbn.length !== sequence.length) generateError(3);
  dbn.split('').forEach(function(char, i) {
    switch(char) {
      case '.':
        break;
      case '(':
        unpaired.push(i);
        break;
      case ')':
        var pairIndex = unpaired.pop();

        if(pairIndex === undefined || !bases[i] || !bases[pairIndex]) {
          generateError(5);
        } else {
          if(basePairs[bases[i].base] !== bases[pairIndex].base) {
            generateError(2);
          }
        }
        break;
      default:
        generateError(0);
    };
  });
  if(unpaired.length) generateError(4);

  if(Object.keys(errMap).length) {
    throw new DNAError(errMap);
  } else {
    return true;
  }

  function generateError(code) {
    if(!errMap[code]) errMap[code] = errCodes[code];
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
      appState.DNA.sequence = response.sequence;

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
