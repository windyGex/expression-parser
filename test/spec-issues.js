var parser = require('../index');
var expect = require('expect.js');
describe('Issues', function () {
    it('http://gitlab.alibaba-inc.com/alpha/expression-parser/issues/1', function () {
        var expression = '!( var0 == "CARTON" || var1 == "PALLETS" || var2 == "WOODENBOX" )';
        var json = {"var0": "xxx", "var1": "xxx", "var2": "xxx"};

        expect(parser.run(expression, json)).to.equal(true);
    });
});

describe('Issues', function () {
    it('#7', function () {
        var expression = 'params && params.length > 0';
        expect(parser.run(expression, '')).to.equal(false);
        expect(parser.run(expression, {params:''})).to.equal('');
        expect(parser.run(expression, {params:[]})).to.equal(false);
        expect(parser.run(expression, {params:[1]})).to.equal(true);
    });

    it('support in', function() {
        var expression = 'input.length > 0';
        expect(parser.run(expression, {input:[]})).to.equal(false);
    })
});