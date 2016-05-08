var mongoose = require('mongoose');

var sequence = new mongoose.Schema({
  dbn: {
    type: String,
    default: '..(((((..(((...)))..)))))...'
  },
  sequence: {
    type: String,
    default: 'TTGGAGTACACAACCTGTACACTCCTTC'
  }
});

module.exports = mongoose.model('Sequence', sequence);
