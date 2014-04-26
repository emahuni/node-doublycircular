module.exports = function () {
  Object.defineProperties(this, {
    '_length': {
      value: 0,
      writable: true,
      enumerable: false,
      configurable: false
    },
    '_current': {
      value: undefined,
      writable: true,
      enumerable: false,
      configurable: false
    },
    '_entry': {
      value: undefined,
      writable: true,
      enumerable: false,
      configurable: false
    },
  })
}

module.exports.prototype.__defineGetter__('length', function() {
  return this._length
})

module.exports.prototype.__defineGetter__('current', function() {
  return this._current && this._current.data
})

module.exports.prototype.push = function (data) {
  this._current = new Item(data, this._current)
  if (this._length === 0) this._entry = this._current
  this._length++
}

module.exports.prototype.reset = function () {
  this._current = this._entry
}

function Item (data, prev) {
  this.data = data
}
