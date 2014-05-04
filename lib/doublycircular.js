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
  if (this._length === 0) { this._entry = this._current }
  this._length++
  return this
}

module.exports.prototype.unshift = function (data) {
  this._entry = new Item(data, this._entry)
  if (this._length === 0) { this._current = this._entry }
  this._length++
  return this
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

module.exports.prototype.shift = function () {
  if (this._length === 0) { return }

  var ret = this._entry
  this._entry = this._entry.next
  this._entry.prev = ret.prev
  this._entry.prev.next = this._entry

  this._length--
  return ret && ret.data;
}

module.exports.prototype.reset = function () {
  this._current = this._entry
  return this
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
  if(this._length === 0) { return }

  var tmp = this._entry
  for(var i = 0; i < this._length; i++) {
    cb(tmp.data)
    tmp = tmp.next
  }
}

module.exports.prototype.forEachCCW = function (cb) {
  if(typeof(cb) !== "function") { return }
  if(this._length === 0) { return }
  var tmp = this._entry.prev
  for(var i = 0; i < this._length; i++) {
    cb(tmp.data)
    tmp = tmp.prev
  }
}

module.exports.prototype.map = function (cb) {
  if(typeof(cb) !== "function") { return this }

  var out = new module.exports()
  this.forEach(function (item) {
    out.push(cb(item))
  })

  return out.reset()
}

module.exports.prototype.reduce = function (cb, iv) {
  if(typeof(cb) !== "function") { return iv }

  var acc = iv
  this.forEach(function (item) {
    acc = cb(acc, item)
  })

  return acc
}

module.exports.prototype.reduceCCW = function (cb, iv) {
  if(typeof(cb) !== "function") { return iv }

  var acc = iv
  this.forEachCCW(function (item) {
    acc = cb(acc, item)
  })

  return acc
}

module.exports.prototype.toArray = function () {
  return this.reduce(function (acc, item) {
    acc.push(item)
    return acc
  }, [])
}

module.exports.prototype.join = function (separator) {
  if(!separator) { separator = '' }
  var out = ''
  this.forEach(function (item) {
    if(out !== '') { out += separator }
    out += item
  })
  return out
}

module.exports.prototype.concat = function (other) {
  var merged = new module.exports()
  var merge = function (acc, item) {
    acc.push(item)
    return acc
  }

  this.reduce(merge, merged)
  other.reduce(merge, merged)
  return merged.reset()
}

module.exports.prototype.every = function (cb) {
  return this.reduce(function (acc, item) {
    return acc && cb(item)
  }, true)
}

module.exports.prototype.some = function (cb) {
  return this.reduce(function (acc, item) {
    return acc || cb(item)
  }, true)
}

module.exports.prototype.filter = function (cb) {
  return this.reduce(function (acc, item) {
    if(cb(item)) { acc.push(item) }
    return acc
  }, new module.exports())
}

module.exports.prototype.reverse = function () {
  var item = this._entry
  var p, n
  for(var i = 0; i < this._length; i++) {
    p = item.prev
    n = item.next
    item.prev = n
    item.next = p
    item = n
  }

  return this
}

module.exports.prototype.find = function (cb) {
  var item = this._current
  for (var i = 0; i < this._length; i++) {
    if(cb(item.data)) {
      this._current = item
      return item.data
    }
    item = item.next
  }
  return false
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
