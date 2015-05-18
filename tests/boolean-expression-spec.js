var BooleanExpression = require('../src/boolean-expression')

describe('BooleanExpression', function () {
    it('x == 3', function () {
        var exp = new BooleanExpression('x == 3');

        expect(exp.run({x: 3})).to.equal(true);
        expect(exp.run({x: '3'})).to.equal(true);
        expect(exp.run(function (key) {
            return {x: 4}[key];
        })).to.equal(false);
    });

    it('x === 3', function () {
        var exp = new BooleanExpression('x === 3');

        expect(exp.run({x: 3})).to.equal(true);
        expect(exp.run({x: '3'})).to.equal(false);
        expect(exp.run(function (key) {
            return {x: 4}[key];
        })).to.equal(false);
    });

    it('x == "3"', function () {
        var exp = new BooleanExpression('x == "3"');

        expect(exp.run({x: '3'})).to.equal(true);
        expect(exp.run(function (key) {
            return {x: '4'}[key];
        })).to.equal(false);
    });

    it('x === "3"', function () {
        var exp = new BooleanExpression('x==="3"');

        expect(exp.run({x: '3'})).to.equal(true);
        expect(exp.run({x: 3})).to.equal(false);
        expect(exp.run(function (key) {
            return {x: '4'}[key];
        })).to.equal(false);
    });

    it('x != 3', function () {
        var exp = new BooleanExpression('x != 3');

        expect(exp.run({x: 3})).to.equal(false);
        expect(exp.run({x: '3'})).to.equal(false);
        expect(exp.run(function (key) {
            return {x: 4}[key];
        })).to.equal(true);
    });

    it('x !== 3', function () {
        var exp = new BooleanExpression('x !== 3');

        expect(exp.run({x: 3})).to.equal(false);
        expect(exp.run({x: '3'})).to.equal(true);
        expect(exp.run(function (key) {
            return {x: 4}[key];
        })).to.equal(true);
    });

    it('x != "3"', function () {
        var exp = new BooleanExpression('x != "3"');

        expect(exp.run({x: '3'})).to.equal(false);
        expect(exp.run(function (key) {
            return {x: '4'}[key];
        })).to.equal(true);
    });

    it('x > 3', function () {
        var exp = new BooleanExpression('x > 3');

        expect(exp.run({x: 5})).to.equal(true);
        expect(exp.run(function (key) {
            return {x: 2}[key];
        })).to.equal(false);
    });

    it('x >= 3', function () {
        var exp = new BooleanExpression('x >= 3');

        expect(exp.run({x: 5})).to.equal(true);
        expect(exp.run({x: 3})).to.equal(true);
        expect(exp.run(function (key) {
            return {x: 2}[key];
        })).to.equal(false);
    });

    it('x < 3', function () {
        var exp = new BooleanExpression('x < 3');

        expect(exp.run({x: 2})).to.equal(true);
        expect(exp.run(function (key) {
            return {x: 5}[key];
        })).to.equal(false);
    });

    it('x <= 3', function () {
        var exp = new BooleanExpression('x <= 3');

        expect(exp.run({x: 2})).to.equal(true);
        expect(exp.run({x: 3})).to.equal(true);
        expect(exp.run(function (key) {
            return {x: 5}[key];
        })).to.equal(false);
    });

    it('not', function () {
        var exp = new BooleanExpression('x == 3', true);

        expect(exp.run({x: 3})).to.equal(false);
        expect(exp.run(function (key) {
            return {x: 4}[key];
        })).to.equal(true);
    });

    it('toString', function () {
        expect(new BooleanExpression('    x     ==3    ').toString()).to.equal('x == 3');
        expect(new BooleanExpression('    x     ==3    ', true).toString()).to.equal('!x == 3');
        expect(new BooleanExpression('y!=    "y"').toString()).to.equal('y != "y"');
    });
});

