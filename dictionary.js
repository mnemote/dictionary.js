// Helpful Dictionary class which provides a safer interface than using
// native JS objects directly.  The keys are mangled to prevent collisions 
// with javascript object methods.

Dictionary = function() {
    this._data = {};
    this._keys = [];
}

Dictionary.prototype.keys = function() { return this._keys }
Dictionary.prototype.vals = function() { return this._keys.map(function (k) { return this._data[" "+k]; }, this); };
Dictionary.prototype.pairs = function() { return this._keys.map(function (k) { return [ k, this._data[" "+k] ]; }, this); };
Dictionary.prototype.count = function() { return this._keys.length };

Dictionary.prototype.get = function(key) { return this._data[" "+key]; };
Dictionary.prototype.has = function(key) { return this._data.hasOwnProperty(" "+key); };
Dictionary.prototype.getdef = function(key, def) { return this.has(key) ? this.get(key) : def }
Dictionary.prototype.set = function(key, val) {
    if (!this._data.hasOwnProperty(" "+key)) this._keys.push(key);
    this._data[" "+key] = val;
    return this;
};
Dictionary.prototype.del = function(key) {
    delete this._data[" "+key];
    this._keys = this._keys.filter(function (k) { return k !== key });
    return this;
}
Dictionary.prototype.setdef = function(key, val) {
    if (!this._data.hasOwnProperty(" "+key)) {
        this._keys.push(key);
        this._data[" "+key] = val;
    }
    return this._data[" "+key];
};
Dictionary.prototype.set_pairs = function(pairs) {
    for (var i in pairs) {
        for (var j=0; j<pairs[i].length; j+=2) {
            this.set(pairs[i][j], pairs[i][j+1]);
        }
    }
    return this;
};
