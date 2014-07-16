if (typeof define !== 'function') { var define = require('amdefine')(module); }
define(['../trait/promise'], function(Promise) {
  'use strict';

  var ret = function() { return this; };

  return function when() {
    var x, i, chain,
    p = new Promise(),
    results = [];

    function collect(index, retval) {
      results[index] = retval;
    }

    for (i = 0; i < arguments.length; ++i) {
      if (arguments[i] instanceof Promise) {
        x = arguments[i];
      } else {
        x = new Promise();
        x.resolve(arguments[i]);
      }
      x.then(collect.bind(null, i));
      chain = chain ? chain.then(ret.bind(x)) : x;
    }

    if (arguments.length) {
      chain.then(p.resolve.bind(null, results), p.reject);
    } else {
      p.resolve(results);
    }

    return p;
  };
});
