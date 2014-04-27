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

module.exports.prototype.pop = function () {
  if (this._length === 0) { return }

  var ret = this._entry.prev
  var second_last = this._entry.prev.prev
  second_last.next = this._entry
  this._entry.prev = second_last

  this._length--


  return ret && ret.data;
}

module.exports.prototype.reset = function () {
  this._current = this._entry
}

module.exports.prototype.next = function () {
  var c = this._current
  this._current = c.next
  return c && c.data
}

module.exports.prototype.prev = function () {
  var c = this._current
  this._current = c.prev
  return c && c.data
}

function Item (data, prev) {
  this.data = data
  this.prev = this
  this.next = this
  if (prev) {
    if (prev.next) {
      this.next = prev.next
      prev.next.prev = this
    }
    this.prev = prev
    prev.next = this
  }
}
