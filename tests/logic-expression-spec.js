var LogicExpression = require('../src/logic-expression')

describe('LogicExpression', function () {
    it('x == 3 && y < 4', function () {
        var exp = new LogicExpression('x == 3', 'y < 4', '&&');

        expect(exp.run({x: 3, y: 3})).to.equal(true);
        expect(exp.run(function (key) {
            return {x: 4, y: 5}[key];
        })).to.equal(false);
    });

    it('x == 3 && y < 4 || z == 0', function () {
        var exp1 = new LogicExpression('x == 3', 'y < 4', '&&');
        var exp = new LogicExpression(exp1.getAlias(), 'z == 0', '||');

        expect(exp.run({x: 3, y: 3})).to.equal(true);
        expect(exp.run({z: 0})).to.equal(true);
        expect(exp.run(function (key) {
            return {x: 4, y: 5}[key];
        })).to.equal(false);
    });

    it('!(x == 3 && y < 4)', function () {
        var exp = new LogicExpression('x == 3', 'y < 4', '&&');
        exp.not = true;

        expect(exp.run({x: 3, y: 3})).to.equal(false);
        expect(exp.run(function (key) {
            return {x: 4, y: 5}[key];
        })).to.equal(true);
    });

    it('toString', function () {
        expect(new LogicExpression('x == 3', 'y < 4', '&&').toString()).to.equal('x == 3 && y < 4');

        var exp1 = new LogicExpression('x == 3', 'y < 4', '&&');
        expect(new LogicExpression(exp1.getAlias(), 'z == 0', '||').toString()).to.equal('x == 3 && y < 4 || z == 0');
        expect(new LogicExpression('z == 0', exp1.getAlias(), '||').toString()).to.equal('z == 0 || (x == 3 && y < 4)');
    });
})

