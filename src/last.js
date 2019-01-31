if (!Array.prototype.last) {
    Array.prototype.last = function (i = 0) {
        return this[this.length - 1 - i];
    };
}