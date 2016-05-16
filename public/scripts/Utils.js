/*
========================================
    Utility functions
    -makeRequest: Ajax requests
    -verifyDNA: verifies DNA & throws DNAErrors
    -createTabHtml: Sanitizes inputs for setting with innerHTML
    -domHide and domShow: show/hide dom elements
========================================
*/

function Utils() {
  var utils = {}

  // Make Ajax requests
  utils.makeRequest = function (type, url, callback, data) {
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

  // Check validity of input sequences
  // Throws specific errors about what's wrong
  // Returns true if valid
  utils.verifyDNA = function(DNA) {
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

  utils.createTabHTML = function(contentString) {
    var content = escapeHtml(contentString);
    return contentString.split('').map(function(char, i) {
      return '<span id="i_' + i + '">' + char + '</span>';
    }).join('');
  }

  // Remove hidden class
  utils.domShow = function(domElement) {
    domElement.classList.remove('hidden');
  }

  // Add hidden class
  utils.domHide = function(domElement) {
    domElement.classList.add('hidden');
  }

  return utils;

  /*
  ========================================
      Helpers
  ========================================
   */
  // Ajax request response handler
  var httpRequest;
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

  // Escapes strings to safely set html
  function escapeHtml(string) {
    var matchHtmlRegExp = /["'&<>]/;
    var str = '' + string;
    var match = matchHtmlRegExp.exec(str);

    if (!match) {
      return str;
    }

    var escape;
    var html = '';
    var index = 0;
    var lastIndex = 0;

    for (index = match.index; index < str.length; index++) {
      switch (str.charCodeAt(index)) {
        case 34: // "
          escape = '&quot;';
          break;
        case 38: // &
          escape = '&amp;';
          break;
        case 39: // '
          escape = '&#39;';
          break;
        case 60: // <
          escape = '&lt;';
          break;
        case 62: // >
          escape = '&gt;';
          break;
        default:
          continue;
      }

      if (lastIndex !== index) {
        html += str.substring(lastIndex, index);
      }

      lastIndex = index + 1;
      html += escape;
    }

    return lastIndex !== index
      ? html + str.substring(lastIndex, index)
      : html;
  }
}
