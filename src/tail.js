if (!Array.prototype.tail) {
    Array.prototype.tail = function (i = 0) {
        return this[this.length - 1 - i];
    };
}