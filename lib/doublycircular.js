module.exports = function () {
  Object.defineProperties(this, {
    '_length': {
      value: 0,
      writable: true,
      enumerable: false,
      configurable: false
    }
  })
}

module.exports.prototype.__defineGetter__('length', function() {
  return this._length
})

module.exports.prototype.push = function (data) {
  this._length++
}
