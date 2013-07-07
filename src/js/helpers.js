function isset(args) {
  return (typeof args !== 'undefined' && args !== null);
}

String.prototype.ucfirst = function() {
    return this.charAt(0).toUpperCase() + this.substr(1);
};
