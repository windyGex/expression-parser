var parser = require('../../expression-parser');

describe('Issues', function () {
    it('http://gitlab.alibaba-inc.com/alpha/expression-parser/issues/1', function () {
        var expression = '!( var0 == "CARTON" || var1 == "PALLETS" || var2 == "WOODENBOX" )';
        var json = {"var0": "xxx", "var1": "xxx", "var2": "xxx"};

        expect(parser.run(expression, json)).to.equal(true);
    });
});