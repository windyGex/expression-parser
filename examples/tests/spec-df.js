var parser = require('../../expression-parser');

describe('动态表单', function () {
    it('name1==value1', function () {
        expect(parser.run("name1==value1", {"name1": "value1"})).to.be(false);
    });
    it('name1==value1', function () {
        expect(parser.run('name1==value1', {"name1": "value1", "value1": "value1"})).to.be(true);
    });
    it('name1=="value1"', function () {
        expect(parser.run('name1=="value1"', {"name1": "value1", "value1": "name1"})).to.be(true);
    });
});