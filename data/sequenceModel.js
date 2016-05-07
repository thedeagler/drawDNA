var mongoose = require('mongoose');

var sequence = new mongoose.Schema({
  dbn: {
    type: String,
    default: '(...(((((.(...).)))))........(((((.....((..(.((((((..(((.((...)).)))..)))))).).))))))).............)'
  },
  sequence: {
    type: String,
    default: 'TTGGGGGGACTGGGGCTCCCATTCGTTGCCTTTATAAATCCTTGCAAGCCAATTAACAGGTTGGTGAGGGGCTTGGGTGAAAAGGTGCTTAAGACTCCGT'
  }
});

module.exports = mongoose.model('Sequence', sequence);
