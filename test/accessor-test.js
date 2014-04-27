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

  describe('#concat()', function () {
    it('merges two lists', function () {
      var a = new DoublyCircular()
      var b = new DoublyCircular()
      var alphabet = 'abcdefghijklmnopqrstuvwxyz'
      for (var i = 0; i < alphabet.length; i++) {
        a.push(i)
        b.push(alphabet[i])
      }

      var c = a.concat(b)
      for (var i = 0; i < a.length; i++) {
        assert.equal(c.next(),i)
      }
      for (var i = 0; i < b.length; i++) {
        assert.equal(c.next(),alphabet[i])
      }
    })
  })
})
