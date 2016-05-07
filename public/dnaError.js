function DNAError(messages) {
  this.name = 'DNAError';
  this.messages = messages || ['There is something wrong with your DNA input.'];
  this.stack = (new Error()).stack;
}
DNAError.prototype = Object.create(Error.prototype);
DNAError.prototype.constructor = DNAError;
