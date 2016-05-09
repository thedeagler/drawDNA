// Get interactive dom elements
var tabContainer = document.getElementById('tabs');
var tabs = Array.prototype.slice.call(document.getElementsByClassName('tab_title'));
var tabContent = document.getElementById('tab_content');
var editButton = document.getElementById('edit');
var saveButton = document.getElementById('save');
var cancelButton = document.getElementById('cancel');
var editForm = document.getElementById('edit_form');
var dbnEditBox = document.getElementById('edit_dbn');
var seqEditBox = document.getElementById('edit_seq');
var errorContainer = document.getElementById('error_container');
var errorMessage = document.getElementById('error_message');

/*
========================================
    Register event listeners
    All initially exposed listeners registered here.
    Nested listeners are registered in the nested component
========================================
 */
tabs.forEach(function(tab) {
  tab.addEventListener('click', handleTabClick.bind(tab));
})
editButton.addEventListener('click', editContent);


/*
========================================
    Event Handlers
========================================
 */
function editContent(e) {
  e.stopPropagation();
  e.preventDefault();

  dbnEditBox.value = appState.DNA.dbn;
  seqEditBox.value = appState.DNA.sequence;

  toggleEditing(true);
}

function saveContent(e) {
  e.stopPropagation();
  e.preventDefault();

  var newDNA = {
    dbn: dbnEditBox.value.replace(/\s+/g, ""),
    sequence: seqEditBox.value.toUpperCase().replace(/\s+/g, ""),
  }

  if(newDNA.dbn !== appState.DNA.dbn || newDNA.sequence !== appState.DNA.sequence) {
    try{
      verifyDNA(newDNA);
      appState.DNA = newDNA;
      // Draw optimistically
      drawDNA(appState.DNA);
      var id = window.location.pathname.split('/')[2];
      var origin = window.location.origin;
      makeRequest('POST', origin + '/data/' + id, function(err, data) {
        if(data) {
          // Redraw if data from server is different than client
          if(data.dbn !== appState.DNA.dbn || data.sequence !== appState.DNA.sequence) {
            appState.DNA.dbn = data.dbn;
            appState.DNA.sequence = data.sequence;

            // TODO: Client should always be right - not sure if this is necessary.
            // drawDNA(appState.DNA);
          }
        } else {
          console.error('Error retrieving data:', err);
        }
      }, JSON.stringify(appState.DNA));
      domHide(errorContainer);
    } catch(e) {
      handleParsingError(e);
    }
  }

  tabContent.innerText = appState.DNA[appState.selectedTab];
  toggleEditing(false);
}

function cancelEdit(e) {
  e.stopPropagation();
  e.preventDefault();

  toggleEditing(false);
}

function toggleEditing(editing) {
  if(editing) {
    appState.selectedTabElement.classList.remove('selected');
    tabContainer.classList.add('editing');

    saveButton.addEventListener('click', saveContent);
    cancelButton.addEventListener('click', cancelEdit);

    domShow(editForm);
    domShow(saveButton);
    domShow(cancelButton);

    domHide(tabContent);
    domHide(editButton);

    appState.editing = true;
  } else {
    appState.selectedTabElement.classList.add('selected');
    tabContainer.classList.remove('editing');

    saveButton.removeEventListener('click', saveContent);
    cancelButton.removeEventListener('click', cancelEdit);

    domShow(tabContent);
    domShow(editButton);

    domHide(editForm);
    domHide(saveButton);
    domHide(cancelButton);

    appState.editing = false;
  }
}

function handleParsingError(e) {
  if (e instanceof DNAError) {
    var errorCodes = e.errors;
    var messages = Object.keys(errorCodes).reduce(function(memo, code) {
      var message = errorCodes[code];
      return memo + '-' + message + '\n';
    }, "")
    errorMessage.innerText = messages;
    domShow(errorContainer);
  } else {
    console.error(e);
  }
}

function handleTabClick(e) {
  e.stopPropagation();
  e.preventDefault();

  // If editing, cancel it.
  if(appState.editing) {
    cancelEdit(e);
  } else {
    var selected = e.target;

    // Manipulate content
    if(appState.selectedTabElement) appState.selectedTabElement.classList.toggle('selected');

    if(appState.selectedTabElement === selected) {
      // Deselect
      appState.selectedTabElement = null;
      appState.selectedTab = '';
      domHide(tabContent);

    } else {
      // Make selection
      appState.selectedTabElement = selected;
      appState.selectedTab = appState.selectedTabElement.textContent.toLowerCase();
      appState.selectedTabElement.classList.toggle('selected');
      domShow(tabContent);
      tabContent.innerHTML = createTabHTML(appState.DNA[e.target.textContent.toLowerCase()]);
    }

    // Manipulate edit button
    if(appState.selectedTabElement) {
      domShow(editButton);
    } else {
      domHide(editButton);
    }
  }
}

function createTabHTML(contentString) {
  // Escape input
  var content = escapeHtml(contentString);
  return contentString.split('').map(function(char, i) {
    return '<span id="i_' + i + '">' + char + '</span>';
  }).join('');
}
