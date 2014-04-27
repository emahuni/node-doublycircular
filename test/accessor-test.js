var assert = require('assert'),
    DoublyCircular = require('../')

var list

describe('Accessors', function () {
  describe('#toArray()', function () {
    it('returns an empty array when the list is empty', function () {
      list = new DoublyCircular()
      var arr = list.toArray()
      assert(Array.isArray(arr))
      assert.equal(arr.length, 0)
    })

    it('returns an array filled with all of the items from the list', function () {
      list = new DoublyCircular()
      for(var i = 0; i < 9; i++) { list.push(i) }
      var arr = list.toArray()
      assert(Array.isArray(arr))
      assert.equal(arr.length, 9)
      for(var i = 0; i < 9; i++) { assert.equal(arr[i], i) }
    })

    it('does not replace current', function () {
      list = new DoublyCircular()
      for(var i = 0; i < 4; i++) { list.push(i) }
      var c = list.current
      list.toArray()
      assert.equal(c, list.current)
    })
  })

  describe('#join()', function () {
    before(function () {
      list = new DoublyCircular()
      for(var i = 0; i < 4; i++) { list.push(i) }
    })

    it('returns an empty string for an empty list', function () {
      assert.equal((new DoublyCircular()).join(), '')
    })

    it('returns a string with the data from each item', function () {
      assert.equal(list.join(), '0123')
    })

    it('returns a string with each item separated by "separator"', function () {
      assert.equal(list.join(', '), '0, 1, 2, 3')
    })

    it('does not replace current', function () {
      var c = list.current
      list.join()
      assert.equal(c, list.current)
    })
  })
})
