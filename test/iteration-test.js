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

  describe('#forEachCCW()', function () {
    before(function () {
      list = new DoublyCircular()
      for (var i = 0; i < 7; i++) {
        list.push(i.toString())
      }
    })

    it('invokes a function for each item', function () {
      var c = list.current
      var output = ''
      list.forEachCCW(function (item) {
        output += item
      })
      assert.equal(output, '6543210')
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

  describe('#reduceCCW()', function () {
    before(function () {
      list = new DoublyCircular()
      for (var i = 1; i < 5; i++) {
        list.push(i*i)
      }
    })

    it('collects the result of the callback', function () {
      assert.equal(list.reduceCCW(function (acc, item) {
        return acc + item
      }, ''), '16941')
    })
  })

  describe('#every()', function () {
    before(function () {
      list = new DoublyCircular()
      for (var i = 1; i < 5; i++) {
        list.push(i*2)
      }
    })

    it('determines if every item is even', function () {
      assert(list.every(function (item) { return item%2 === 0 }))
    })

    it('determines that not every item is even', function () {
      list.push(7)
      assert(!list.every(function (item) { return item%2 === 0}))
    })
  })

  describe('#some()', function () {
    before(function () {
      list = new DoublyCircular()
      for (var i = 1; i < 5; i++) {
        list.push(i*2)
      }
    })

    it('determines if any item is even', function () {
      assert(list.some(function (item) { return item%2 === 0 }))
    })

    it('determines that some item is even', function () {
      list.push(7)
      assert(list.some(function (item) { return item%2 === 0}))
    })
  })

  describe('#filter()', function () {
    before(function () {
      list = new DoublyCircular()
      for (var i = 0; i < 100; i++) {
        list.push(i)
      }
    })

    it('removes items that do not pass the test defined in the callback', function () {
      assert.equal(list.filter(function (item) { return item%7 === 0}).length, 15)
    })
  })

  describe('#find()', function () {
    before(function () {
      list = new DoublyCircular()
      for (var i = 0; i < 100; i++) {
        list.push(i)
      }
      list.reset()
    })

    it('returns the first item that matches the callback', function () {
      assert.equal(list.find(function (item) { return item.toString().length >= 2 }), 10)
    })

    it('starts at the current item and sets the current item', function () {
      list.reset()
      for (var i = 0; i < 37; i++) {
        list.next()
      }
      assert.equal(list.find(function (item) { return (item & 4) === 0 }), 40)
      assert.equal(list.current, 40)
    })
  })

  describe('#include()', function () {
    before(function () {
      list = new DoublyCircular()
      for (var i = 0; i < 39; i++) {
        list.push(i)
      }
      list.reset()
    })

    it('returns true if the list contains the item', function () {
      for (var i = 0; i < 39; i++) {
        assert(list.include(i))
      }
    })

    it('returns false if the list does not contain the item', function () {
      assert(!list.include("0"))
      assert(!list.include(-1))
      assert(!list.include(40))
      assert(!list.include([0, 1]))
      assert(!list.include({key: "value"}))
    })
  })
})
