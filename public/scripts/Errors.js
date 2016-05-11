function DNAError(errorsObj) {
  this.name = 'DNAError';
  this.errors = errorsObj || {default: 'There is something wrong with your DNA input.'};
  this.stack = (new Error()).stack;
}
DNAError.prototype = Object.create(Error.prototype);
DNAError.prototype.constructor = DNAError;
