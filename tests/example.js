const assert = require('chai').assert;
const { addNumber } = require('../index');
const app = require('../index')

// alternative
sayHelloResult = app.hello();
addNumberResult = app.addNumber(5, 5);

describe('app', function () {
    before(function () {
        console.log('before');
    })

    after(function () {
        console.log('after');
    })

    beforeEach(function () {
        console.log('before each');
    })

    afterEach(function () {
        console.log('after each');
    })

    describe('hello', function () {
        it('app should return hello', function () {
            // assert.equal(app.hello(), 'hello')
            assert.equal(sayHelloResult, 'hello')
        });

        it('app should return string', function () {
            // assert.typeOf(app.hello(), 'string')
            assert.typeOf(sayHelloResult, 'string')
        });
    })

    describe('add number', function () {
        it('add number should be above 5', function () {
            // let result = app.addNumber(5, 5)
            // assert.isAbove(result, 5)
            assert.isAbove(addNumberResult, 5)
        });

        it('add number should return number', function () {
            // let result = app.addNumber(5, 5)
            // assert.typeOf(result, 'number')
            assert.typeOf(addNumberResult, 'number')
        });
    })
})