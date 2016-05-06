/*
========================================
    Register event listeners
    All initially exposed listeners registered here.
    Nested listeners are registered in the nested component
========================================
 */
// Get interactive dom elements
var tabs = Array.prototype.slice.call(document.getElementsByClassName('tab_title'));
var tabContent = document.getElementById('tab_content');
var editButton = document.getElementById('edit');
var editForm = document.getElementById('edit_form');
var saveButton = document.getElementById('save');
var cancelButton = document.getElementById('cancel');
var editBox = document.getElementById('edit_box');

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

  appState.editing = true;
  editBox.value = appState.tabContent[appState.selectedTab];

  saveButton.addEventListener('click', saveContent);
  cancelButton.addEventListener('click', cancelEdit);

  domShow(editForm);
  domShow(saveButton);
  domShow(cancelButton);

  domHide(tabContent);
  domHide(editButton);
}

function saveContent(e) {
  e.stopPropagation();
  e.preventDefault();

  appState.editing = false;
  appState.tabContent[appState.selectedTab] = editBox.value;
  tabContent.innerText = appState.tabContent[appState.selectedTab];

  saveButton.removeEventListener('click', saveContent);
  cancelButton.removeEventListener('click', cancelEdit);

  domShow(tabContent);
  domShow(editButton);

  domHide(editForm);
  domHide(saveButton);
  domHide(cancelButton);
}

function cancelEdit(e) {
  e.stopPropagation();
  e.preventDefault();

  appState.editing = false;
  saveButton.removeEventListener('click', saveContent);
  cancelButton.removeEventListener('click', cancelEdit);

  domShow(tabContent);
  domShow(editButton);

  domHide(editForm);
  domHide(saveButton);
  domHide(cancelButton);
}

function handleTabClick(e) {
  e.stopPropagation();
  e.preventDefault();

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
    tabContent.innerText = appState.tabContent[e.target.textContent.toLowerCase()];
  }

  // Manipulate edit button
  if(appState.selectedTabElement) {
    domShow(editButton);
  } else {
    domHide(editButton);
  }

  // If editing, cancel it.
  if(appState.editing) {
    cancelEdit(e);
  }
}
