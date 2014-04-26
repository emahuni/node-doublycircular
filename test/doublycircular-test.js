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
  })
})
