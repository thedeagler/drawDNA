window.appState = {
  tabContent: {
    dbn: '...(((((.(...).)))))........(((((.....((..(.((((((..(((.((...)).)))..)))))).).)))))))...............',
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

// Remove hidden class
function domShow(domElement) {
  domElement.classList.remove('hidden');
}

// Add hidden class
function domHide(domElement) {
  domElement.classList.add('hidden');
}
