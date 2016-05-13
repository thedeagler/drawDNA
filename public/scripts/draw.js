(function() {
  // Set up initial state on page load
  window.appState = {
    DNA: new DNA(),
    selectedTab: 'sequence',
    selectedTabElement: document.getElementsByClassName('tab_title')[0],
  }
  window.utils = new Utils();

  // Set up initial view on page load
  var id = window.location.pathname.split('/')[2];
  var origin = window.location.origin;
  var tabContent = document.getElementById('tab_content');

  if(id) {
    utils.makeRequest('GET', origin + '/data/' + id, function(err, data) {
      if(data) {
        appState.DNA.setDbn(data.dbn);
        appState.DNA.setSequence(data.sequence);
        tabContent.innerHTML = utils.createTabHTML(appState.DNA.sequence);
        appState.DNA.draw();
      } else {
        console.error('Error retrieving data:', err);
      }
    });
  }
})()
