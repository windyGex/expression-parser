var parser = require('../index');
var expect = require('expect.js');
describe('ExpressionParser', function () {
    it('简单表达式: x > 3', function () {
        var expression = 'x > 3';

        expect(parser.run(expression, {
            x: 10
        })).to.equal(true);
        expect(parser.run(expression, {
            x: 1
        })).to.equal(false);
    });

    it('简单表达式: !(x > 3)', function () {
        var expression = '!(x > 3)';

        expect(parser.run(expression, {
            x: 10
        })).to.equal(false);
        expect(parser.run(expression, {
            x: 1
        })).to.equal(true);
    });


    it('复合表达式: x > 3 && y == "y"', function () {
        var expression = 'x > 3 && y == "y"';

        expect(parser.run(expression, {
            x: 10,
            y: 'y'
        })).to.equal(true);
        expect(parser.run(expression, {
            x: 10,
            y: 'y2'
        })).to.equal(false);
    });

    it('复合表达式: !(x > 3 && y == "y")', function () {
        var expression = '!(x > 3 && y == "y")';

        expect(parser.run(expression, {
            x: 10,
            y: 'y'
        })).to.equal(false);
        expect(parser.run(expression, {
            x: 10,
            y: 'y2'
        })).to.equal(true);
    });


    it('多次运行结果: x > 3 && y == "y"', function () {
        var expression = 'x > 3 && y == "y"';


        expect(parser.run(expression, {
            x: 10,
            y: 'y'
        })).to.equal(true);

        expect(parser.run(expression, {
            x: 10,
            y: 'y2'
        })).to.equal(false);

    });
});
