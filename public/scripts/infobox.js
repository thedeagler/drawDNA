(function() {
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
      Main
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
        utils.verifyDNA(newDNA);
        appState.DNA.setDNA(newDNA);
        appState.DNA.draw();
        var id = window.location.pathname.split('/')[2];
        var origin = window.location.origin;
        utils.makeRequest('POST', origin + '/data/' + id, function(err, data) {
          if(err) console.error('Error retrieving data:', err);
        }, JSON.stringify(appState.DNA));
        utils.domHide(errorContainer);
      } catch(e) {
        handleParsingError(e);
      }
    }

    tabContent.innerHTML = utils.createTabHTML(appState.DNA[appState.selectedTab]);
    toggleEditing(false);
  }

  function cancelEdit(e) {
    e.stopPropagation();
    e.preventDefault();

    toggleEditing(false);
  }

  function toggleEditing(editing) {
    if(editing) {
      appState.selectedTabElement.classList.remove('selected_tab');
      tabContainer.classList.add('editing');

      saveButton.addEventListener('click', saveContent);
      cancelButton.addEventListener('click', cancelEdit);

      utils.domShow(editForm);
      utils.domShow(saveButton);
      utils.domShow(cancelButton);

      utils.domHide(tabContent);
      utils.domHide(editButton);

      appState.editing = true;
    } else {
      appState.selectedTabElement.classList.add('selected_tab');
      tabContainer.classList.remove('editing');

      saveButton.removeEventListener('click', saveContent);
      cancelButton.removeEventListener('click', cancelEdit);

      utils.domShow(tabContent);
      utils.domShow(editButton);

      utils.domHide(editForm);
      utils.domHide(saveButton);
      utils.domHide(cancelButton);

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
      utils.domShow(errorContainer);
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
      if(appState.selectedTabElement) appState.selectedTabElement.classList.toggle('selected_tab');

      if(appState.selectedTabElement === selected) {
        // Deselect
        appState.selectedTabElement = null;
        appState.selectedTab = '';
        utils.domHide(tabContent);

      } else {
        // Make selection
        appState.selectedTabElement = selected;
        appState.selectedTab = appState.selectedTabElement.textContent.toLowerCase();
        appState.selectedTabElement.classList.toggle('selected_tab');
        utils.domShow(tabContent);
        tabContent.innerHTML = utils.createTabHTML(appState.DNA[e.target.textContent.toLowerCase()]);
      }

      // Manipulate edit button
      if(appState.selectedTabElement) {
        utils.domShow(editButton);
      } else {
        utils.domHide(editButton);
      }
    }
  }
})()
