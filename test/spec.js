var parser = require('../index');
var expect = require('expect.js');
var model = {
    a: 1,
    b: 2,
    c: function () {
        return {
            d: 5
        }
    },
    e: ['a', 'b', 'c'],
    f: [false],
    h: ['a b', 'b c'],
    g: [
        {
            a: 1
        }
    ]
};


function exec(input, json) {
    return parser.run(input, json || model);
}

describe('Array 基本语法', function () {

    //it('e==["a", "b", "c"]', function () {
    //    expect(exec('e==["a", "b", "c"]')).to.be(true);
    //});
    //
    //it('x == [3,4] && y ==1', function () {
    //    expect(exec('x == [3,4]', {x: [3, 4], y: 1})).to.be(true);
    //});

    it('x in [3,4] && y in [3,4]', function () {
        expect(exec('x in [3,4] && y in [3,4]', {x: 3, y: 4})).to.be(true);
    });
});

describe('Array[in] 语法', function () {
    it('1 in [1,2,3]', function () {
        expect(exec('1 in [1,2,3]')).to.be(true);
    });
    it('(1 in [1,2,3])', function () {
        expect(exec('(1 in [1,2,3])')).to.be(true);
    });
    it('"a" in e', function () {
        expect(exec('"a" in e')).to.be(true);
    });
    it('"e" in e', function () {
        expect(exec('"e" in e')).to.be(false);
    });
    it('!("e" in e)', function () {
        expect(exec('!("e" in e)')).to.be(true);
    });
    it('"a b" in h', function () {
        expect(exec('"a b" in h')).to.be(true);
    });
});


describe('! 语法', function () {
    it('f[0]1', function () {
        expect(exec('f[0]')).to.be(false);
    });
    it('!(f[0])', function () {
        expect(exec('!(f[0])')).to.be(true);
    });
});


describe('> 语法', function () {
    it('g[0].a>1', function () {
        expect(exec('g[0].a>1')).to.be(false);
    });
});


describe('>= 语法', function () {
    it('a >= 1', function () {
        expect(exec('a >= 1')).to.be(true);
    });
});

describe('== 语法', function () {
    it('c().d==5', function () {
        expect(exec('c().d==5')).to.be(true);
    });
});

describe('+ 语法', function () {
    it('a+1', function () {
        expect(exec('a+1')).to.be(2);
    });
    it('g[0].a+1', function () {
        expect(exec('g[0].a+1')).to.be(2);
    });
});

describe('逻辑&&，逻辑||, 语法', function () {
    it('!(a>=1 && c().d == 5 && b<=2)', function () {
        expect(exec('!(a>=1 && c().d == 5 && b<=2)')).to.be(false);
    });
    it('a>=1 && c().d == 5 && b>2', function () {
        expect(exec('a>=1 && c().d == 5 && b>2')).to.be(false);
    });

    it('a>=1 || c().d == 5 || b>2', function () {
        expect(exec('a>=1 || c().d == 5 || b>2')).to.be(true);
    });
    it('(a>=1 && c().d == 5) || b>2', function () {
        expect(exec('(a>=1 && c().d == 5) || b>2')).to.be(true);
    });
    it('a>=1 && (c().d == 5 || b>2)', function () {
        expect(exec('a>=1 && (c().d == 5 || b>2)')).to.be(true);
    });
});


