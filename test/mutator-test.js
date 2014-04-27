var assert = require('assert'),
    DoublyCircular = require('../')

var list

describe('Mutators', function () {
  describe('#push()', function () {
    before(function () {
      list = new DoublyCircular()
      for (var i = 0; i < 5; i++) {
        list.push(i.toString())
      }
    })

    it('updates the length', function () {
      assert.equal(list.length, 5)
    })
    it('keeps track of the current item', function () {
      assert.equal(list.current, '4')
    })
  })

  describe('#reset()', function () {
    before(function () {
      list = new DoublyCircular()
      for (var i = 0; i < 15; i++) {
        list.push(15-i)
      }
    })

    it('moves current to first element inserted', function () {
      assert.equal(list.current, '1')
      list.reset()
      assert.equal(list.current, '15')
    })

    it('returns a reference to itself', function () {
      assert.equal(list.reset(), list)
    })
  })

  describe('#pop()', function () {
    beforeEach(function () {
      list = new DoublyCircular()
    })

    it('returns undefined for empty lists', function () {
      assert.equal(list.length, 0)
      assert.equal(list.pop(), undefined)
      assert.equal(list.length, 0)
    })

    it('removes the last element added', function () {
      for (var i = 0; i < 5; i++) {
        list.push(i)
      }
      assert.equal(list.pop(), 4)
      assert.equal(list.length, 4)
      assert.equal(list.pop(), 3)
    })

    it('removes all of the elements', function () {
      for (var i = 0; i < 20; i++) { list.push(i) }
      for (var i = 0; i < 20; i++) {
        assert.equal(list.pop(), 19-i)
        assert.equal(list.length, 19-i)
      }
    })
  })

  describe('#reverse()', function () {
    before(function () {
      list = new DoublyCircular()
      for (var i = 0; i < 10; i++) {
        list.push(i)
      }
    })

    it('is a self-inverse', function () {
      assert.equal(list.reverse().reverse(), list)
    })

    it('swaps prev and next', function () {
      list.reverse()
      var c
      for (var i = 0; i < 10; i++) {
        c = list.next()
        assert.equal(c, 9-i)
      }
    })
  })
})
