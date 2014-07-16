if (typeof define !== 'function') { var define = require('amdefine')(module); }
define(function() {
  'use strict';

  var toStr = Object.prototype.toString;

  return function construct() {
    // Type check this is a function
    if (!~toStr.call(this).indexOf('Function')) {
      throw new TypeError('construct called on incompatible Object');
    }

    var inst = Object.create(this.prototype),
    ret = this.apply(inst, arguments);
    // Follow new behavior when constructor returns a value
    return Object(ret) === ret ? ret : inst;
  };
});
