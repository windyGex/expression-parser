var $ = require('alpha-jquery/jquery');
var expressionParser = require('../src/expression-parser');

describe('ExpressionParser', function () {
    it('简单表达式: x > 3', function () {
        var expression = 'x > 3';

        expect(expressionParser.run(expression, {
            x: 10
        })).to.equal(true);
        expect(expressionParser.run(expression, {
            x: 1
        })).to.equal(false);
    });

    it('简单表达式: !(x > 3)', function () {
        var expression = '!(x > 3)';

        expect(expressionParser.run(expression, {
            x: 10
        })).to.equal(false);
        expect(expressionParser.run(expression, {
            x: 1
        })).to.equal(true);
    });


    it('复合表达式: x > 3 && y == "y"', function () {
        var expression = 'x > 3 && y == "y"';

        expect(expressionParser.run(expression, {
            x: 10,
            y: 'y'
        })).to.equal(true);
        expect(expressionParser.run(expression, {
            x: 10,
            y: 'y2'
        })).to.equal(false);
    });

    it('复合表达式: !(x > 3 && y == "y")', function () {
        var expression = '!(x > 3 && y == "y")';

        expect(expressionParser.run(expression, {
            x: 10,
            y: 'y'
        })).to.equal(false);
        expect(expressionParser.run(expression, {
            x: 10,
            y: 'y2'
        })).to.equal(true);
    });


    it('左值替换（用 input 的 value 来替换左值）: namey == "y"', function () {
        var expression = 'namey == "y"';
        var i1 = $('<input name="namey" value="y" />');
        $('body').append(i1);

        expect(expressionParser.run(expression, function (l) {
            // <input name="namey" value="y" />

            return $('[name=' + l + ']').val();
        })).to.equal(true);

        i1.remove();
    });


    it('多次运行结果: x > 3 && y == "y"', function () {
        var expression = 'x > 3 && y == "y"';
        var rst = expressionParser.compile(expression);

        expect(rst.run({
            x: 10,
            y: 'y'
        })).to.equal(true);
        expect(rst.run({
            x: 10,
            y: 'y2'
        })).to.equal(false);
    });
});
