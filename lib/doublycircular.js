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

module.exports.prototype.forEach = function (cb) {
  if(typeof(cb) !== "function") { return }
  if(this.length === 0) { return }

  var tmp = this._entry
  for(var i = 0; i < this.length; i++) {
    cb(tmp.data)
    tmp = tmp.next
  }
}

module.exports.prototype.reduce = function (cb, iv) {
  if(typeof(cb) !== "function") { return iv }

  var acc = iv
  this.forEach(function (item) {
    acc = cb(acc, item)
  })

  return acc
}

module.exports.prototype.toArray = function () {
  var arr = []
  this.forEach(function (item) {
    arr.push(item)
  })
  return arr
}

module.exports.prototype.join = function (separator) {
  if(!separator) {
    separator = ''
  }
  var out = ''
  this.forEach(function (item) {
    if(out !== '') { out += separator }
    out += item
  })
  return out
}

module.exports.prototype.concat = function (other) {
  var merged = new module.exports()
  var c = this._current
  this.reset()
  for(var i=0; i < this._length; i++) {
    merged.push(this.next())
  }
  this._current = c
  other.reset()
  for(var i=0; i < other.length; i++) {
    merged.push(other.next())
  }
  merged.reset()
  return merged
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
