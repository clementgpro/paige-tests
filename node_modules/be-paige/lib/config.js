var cache = {},

set = function(key, value) {
  if (typeof key !== 'string') {
    throw new TypeError('Config key must be a string');
  }
  var names = key.split('.'), scope;

  key = names.pop();
  scope = names.reduce(function(o, k) {
    if (o[k] === undefined) { o[k] = {}; }
    return o[k];
  }, cache);

  scope[key] = value;
},

Config = {
  set : function(key, value) {
    var i;
    if (typeof key === 'object') {
      for (i in key) {
        if (key.hasOwnProperty(i)) {
          set(i, key[i]);
        }
      }
    }
    else {
      set(key, value);
    }
  },

  get : function(ns) {
    if (!arguments.length) {
      return cache;
    }

    if (typeof ns !== 'string') {
      throw new TypeError('Config key must be a string');
    }

    return ns.split('.')
    .reduce(function(scope, key) {
      return scope && scope[key];
    }, cache);
  },

  extend : function() {
    var base = Object.create(cache), extension, param, key;

    for (param = 0; param < arguments.length; ++param) {
      extension = arguments[param];
      for (key in extension) {
        if (extension.hasOwnProperty(key)) {
          base[key] = extension[key];
        }
      }
    }

    return base;
  }
};

module.exports = Config;
