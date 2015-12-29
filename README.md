# Usage

    parser.parse(input, model)

# examples

    parser.parse('a+b', {
        a:1,
        b:2
    })
    // console 3

# demo

    open examples/index.html

# Tests

    npm install
    mocha

# Developer

    npm install
    gulp
    open examples/index.html

# Not Support

    console.log(exec('a>=1 && c().d == 5 && !(b>2)'));