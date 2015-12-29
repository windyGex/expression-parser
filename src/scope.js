require('./polyfill');
var parser = require('./parser').parser,
    util = require('./util');

var model = {}, get = function (object, path) {
    if(!object){
        return false;
    }
    path = path.toString();
    var self = object, field = path.split('.'), val, key;
    if (field.length) {
        key = field[0];
        //lists[1].name
        if (key.indexOf('[') >= 0) {
            key = key.match(/(.*)\[(.*)\]/);
            if (key) {
                val = object[key[1]][key[2]];
            }
        } else {
            val = object[field[0]];
        }
        if (val) {
            for (var i = 1; i < field.length; i++) {
                val = val[field[i]];
                if (typeof val === 'undefined') {
                    break;
                }
            }
        }
    }
    return val;
};

var scope = {

    notE: function (key) {
        return !key;
    },

    compare: function (a, b, type) {
        return util[type](a, b);
    },

    get: function (key) {
        return get(model, key);
    },

    fun: function (key) {
        var value = get(model, key);
        if(typeof value == 'function'){
            return value();
        }
    },

    execFun: function (fun, key) {
        var value = this.fun(fun);
        if(value){
            return value[key];
        }
    },

    'in': function(a, b){
        return util['in'](a,b);
    }
};

parser.yy = scope;

var run = function (input, object) {
    model = object;
    return parser.parse(input);
};

exports.parse = run;
exports.run = run;