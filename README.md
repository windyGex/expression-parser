# Usage

    parser.parse(input, model)

# demo

        var model = {};
        model.a = 1;
        model.b = 2;
        model.c = function () {
            return {
                d: 5
            }
        };

        model.e = ['a', 'b', 'c'];
        model.f = [false];
        model.h = ['a b', 'b c'];
        model.g = [{
            a:1
        }]
        function exec(input) {
            return parser.parse(input, model);
        }
        console.log(exec('1 in [1,2,3]'));
        console.log(exec('(1 in [1,2,3])'));
        console.log(exec('a>=1'));
        console.log(exec('c().d==5'));
        console.log(exec('!(a>=1 && c().d == 5 && b<=2)'));
        console.log(exec('a>=1 && c().d == 5 && b>2'));
        console.log(exec('a>=1 || c().d == 5 || b>2'));
        console.log(exec('(a>=1 && c().d == 5) || b>2'));
        console.log(exec('a>=1 && (c().d == 5 || b>2)'));
        console.log(exec('"a" in e'));
        console.log(exec('"e" in e'));
        console.log(exec('!("e" in e)'));
        console.log(exec('!(f[0])'));
        console.log(exec('f[0]'));
        console.log(exec('"a b" in h'));
        console.log(exec('a+1'));
        console.log(exec('g[0].a+1'));

# Not Support

        console.log(exec('a>=1 && c().d == 5 && !(b>2)'));