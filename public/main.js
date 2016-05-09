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

/*
========================================
    Main
========================================
 */
// Get sequence data on page load
var id = window.location.pathname.split('/')[2];
var origin = window.location.origin;
if(id) {
  makeRequest('GET', origin + '/data/' + id, function(err, data) {
    if(data) {
      appState.DNA.dbn = data.dbn;
      appState.DNA.sequence = data.sequence;

      drawDNA(appState.DNA);
    } else {
      console.error('Error retrieving data:', err);
    }
  });
}

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
function makeRequest(type, url, callback, data) {
  httpRequest = new XMLHttpRequest();

  if (!httpRequest) {
    alert('Giving up :( Cannot create an XMLHTTP instance');
    return false;
  }

  httpRequest.onreadystatechange = handleResponse.bind(this, callback);
  httpRequest.open(type, url);
  httpRequest.setRequestHeader("content-type", "application/json");
  httpRequest.send(data);
}

function handleResponse(callback) {
  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    if (httpRequest.status === 200) {
      var response = JSON.parse(httpRequest.responseText)

      callback(null, response);
    } else {
      callback(err, null);
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
