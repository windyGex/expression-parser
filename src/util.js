var util = {};

util.mixin = function (dest, prop) {
    var args = arguments,
        length = args.length;

    for (var i = 1; i < length; i++) {
        for (var key in args[i]) {
            if (args[i].hasOwnProperty(key)) {
                dest[key] = args[i][key];
            }
        }
    }
    return dest;
};

// scope
util.mixin(util, {
    isKeyWord: function (key) {
        return ['true', 'false', 'null', 'undefined'].indexOf(key) != -1;
    },

    'in': function (a, b) {
        if (!b) {
            b = [];
        }
        return b.indexOf(a) > -1;
    }
});

util.each = function (object, callback, context) {
    var name,
        i = 0,
        length = object.length;
    if (length === undefined) {
        for (name in object) {
            if (callback.call(context || object[name], object[name], name) === false) {
                break;
            }
        }
    } else {
        for (var value = object[0];
             i < length && callback.call(context || object[i], value, i) !== false;
             value = object[++i]) {
        }
    }
    return object;
};

util.isArray = Array.isArray || function (object) {
    return toString.call(object) === '[object Array]';
};

util.isPlainObject = function (object) {
    if (!object || object.toString() !== '[object Object]' || object.nodeType || object.setInterval) {
        return false;
    }

    if (object.constructor && !object.hasOwnProperty('constructor') && !object.constructor.prototype.hasOwnProperty('isPrototypeOf')) {
        return false;
    }

    var key;
    for (key in object) {
    }

    return key === undefined || object.hasOwnProperty(key);
};

var compareCollections = {
    '+': function (a, b) {
        return a + b;
    },
    '-': function (a, b) {
        return a - b;
    },
    '*': function (a, b) {
        return a * b;
    },
    '/': function (a, b) {
        return a / b;
    },

    '>': function (a, b) {
        return a > b;
    },

    '<': function (a, b) {
        return a < b;
    },

    '==': function (a, b) {
        return a == b;
    },
    '>=': function (a, b) {
        return a >= b;
    },
    '<=': function (a, b) {
        return a <= b;
    },
    '!=': function (a, b) {
        return a != b;
    },
    '!==': function (a, b) {
        return a !== b;
    },
    '===': function (a, b) {
        return a === b;
    },
    '||': function (a, b) {
        return a || b;
    },
    '&&': function (a, b) {
        return a && b;
    }
};

util.each(compareCollections, function(value, key){
    compareCollections[key] = function(a, b){
        if(typeof a == 'function'){
            a = a();
        }
        if(typeof b == 'function'){
            b = b();
        }
        return value(a, b);
    }
});

util.mixin(util, compareCollections);

module.exports = util;