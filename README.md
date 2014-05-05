# doublycircular

Doubly Circular linked list with iterator and array-like interface

[![Build Status badge](http://img.shields.io/travis/rampantmonkey/node-doublycircular.svg?style=flat)](https://travis-ci.org/rampantmonkey/node-doublycircular) [![npm package version badge](http://img.shields.io/npm/v/doublycircular.svg?style=flat)](https://www.npmjs.org/package/doublycircular) [![license badge](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](http://opensource.org/licenses/MIT)

## Properties
- `DoublyCircular.length`
- `DoublyCircular.prototype`

## Methods

### Mutator methods
- `DoublyCircular.prototype.pop()` remove last item added to the list
- `DoublyCircular.prototype.push()` add new item to the list
- `DoublyCircular.prototype.reverse()` swap next and previous for each item
- `DoublyCircular.prototype.shift()` remove item from beginning of list
- `DoublyCircular.prototype.unshift()` insert item at beginning of list

### Accessor methods
- `DoublyCircular.prototype.concat()` merge two doubly circular lists into a new one
- `DoublyCircular.prototype.join()` return a string containing all of the items in the list with an optional separator
- `DoublyCircular.prototype.toArray()` return an array containing all of the items in the list

### Iteration methods
- `DoublyCircular.prototype.every()` check if `callback` is true for every item
- `DoublyCircular.prototype.filter()` create new list with only the items for which `callback` is true
- `DoublyCircular.prototype.find()` return the first item in the list after `current` for which `callback` is true
- `DoublyCircular.prototype.forEach()` invoke `callback` function for each item in the list
- `DoublyCircular.prototype.forEachCCW()` same as `forEach()` but opposite iteration direction
- `DoublyCircular.prototype.include()` return `true` if any item in the list threequals (`===`) the parameter
- `DoublyCircular.prototype.map()` create a new list with each item's data containing the result of the callback
- `DoublyCircular.prototype.reduce()` apply `callback` against accumulator and each value in the list
- `DoublyCircular.prototype.reduceCCW()` same as `reduce()` but opposite iteration direction
- `DoublyCircular.prototype.some()` check if `callback` is true for any item

## Contributing

Make sure that the test suite passes after your changes.
You should also have tests that cover the new functionality or demonstrate the bug fix.
The test suite is written on top of [mocha](https://github.com/visionmedia/mocha).
To run the test suite just type `make`.
This will download all of the dependencies (if not already installed) and run the tests.

## License
_This software - &copy; Casey Robinson 2014 - is released under the MIT license._
You can find a copy in [LICENSE.txt](LICENSE.txt) or at [opensource.org](http://opensource.org/licenses/MIT).
