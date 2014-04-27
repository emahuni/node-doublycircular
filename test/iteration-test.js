var assert = require('assert'),
    DoublyCircular = require('../')

var list

describe('Iteration', function () {
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

  describe('#forEach()', function () {
    before(function () {
      list = new DoublyCircular()
      for (var i = 0; i < 7; i++) {
        list.push(i.toString())
      }
    })

    it('invokes a function for each item', function () {
      var c = list.current
      var output = ''
      list.forEach(function (item) {
        output += item
      })
      assert.equal(output, '0123456')
      assert.equal(list.current, c)
    })

    it('does not throw an error if no callback provided', function () {
      assert.doesNotThrow(function () {list.forEach()})
    })
  })

  describe('#map()', function () {
    before(function () {
      list = new DoublyCircular()
      for (var i = 1; i < 5; i++) {
        list.push(i*2)
      }
    })

    it('builds a new list', function () {
      var out = list.map(function(item) { return item/2 })
      for (var i = 1; i < 5; i++) {
        assert.equal(out.next(), i)
      }
    })
  })

  describe('#reduce()', function () {
    before(function () {
      list = new DoublyCircular()
      for (var i = 1; i < 5; i++) {
        list.push(i*i)
      }
    })

    it('collects the result of the callback', function () {
      assert.equal(list.reduce(function (acc, item) {
        return acc + item
      }, 0), 30)
    })
  })
})
