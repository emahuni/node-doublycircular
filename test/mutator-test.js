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
  })
})
