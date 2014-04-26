var assert = require('assert'),
    DoublyCircular = require('../')

var list

describe('DoublyCircular', function () {
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
  })

  describe('#next()', function () {
    before(function () {
      list = new DoublyCircular()
      for (var i = 0; i < 10; i++) {
        list.push(i)
      }
    })

    beforeEach(function () {
      list.reset()
    })

    it('returns the current item in the list and moves the current item pointer', function () {
      assert.equal(list.current, 0)
      assert.equal(list.next(), 0)
      assert.equal(list.current, 1)
    })

    it('goes the whole way around once', function () {
      for (var i = 0; i < 10; i++) {
        assert.equal(list.next(), i)
      }
    })

    it("goes 'round-and-'round", function () {
      for (var i = 0; i < 111; i++) {
        assert.equal(list.next(), i%10)
      }
    })
  })

  describe('#prev()', function () {
    before(function () {
      list = new DoublyCircular()
      for (var i = 0; i < 10; i++) {
        list.push(i)
      }
    })

    beforeEach(function () {
      list.reset()
    })

    it('returns the current item in the list and moves the current item pointer backwards', function () {
      assert.equal(list.current, 0)
      assert.equal(list.prev(), 0)
      assert.equal(list.current, 9)
    })

    it('goes the whole way around once', function () {
      for (var i = 0; i < 10; i++) {
        assert.equal(list.prev(), ((-i)%10+10)%10)
      }
    })

    it("goes 'round-and-'round", function () {
      for (var i = 0; i < 111; i++) {
        assert.equal(list.prev(), ((-i)%10+10)%10)
      }
    })
  })
})
