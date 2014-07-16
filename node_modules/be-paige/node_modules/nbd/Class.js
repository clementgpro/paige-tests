if (typeof define !== 'function') { var define = require('amdefine')(module); }
define(function() {
  "use strict";

  // The base Class implementation (does nothing)
  var Klass = function() {},
  extend, mixin, inherits,
  fnTest = /xyz/.test(function(){return xyz;}) ? /\b_super\b/ : /.*/;

  // allows adding any object's properties into the class
  mixin = function(abstract) {
    var descriptor = {};
    Object.keys(abstract).forEach(function(prop) {
      descriptor[prop] = {
        configurable:true,
        writable:true,
        enumerable:false,
        value:abstract[prop]
      };
    });
    Object.defineProperties(this.prototype, descriptor);
    return this;
  };

  // determines if current class inherits from superclass
  inherits = function(superclass) {
    var prop, result = false;
    if (typeof superclass === 'function') {
      // Testing linear inheritance
      return superclass.prototype.isPrototypeOf(this.prototype);
    }
    if (typeof superclass === 'object') {
      // Testing horizontal inheritance
      result = true;
      for (prop in superclass) {
        if (superclass.hasOwnProperty(prop) &&
            superclass[prop] !== this.prototype[prop]) {
          result = false;
          break;
        }
      }
    }
    return result;
  };

  // Create a new Class that inherits from this class
  extend = function(prop, stat) {
    var _super = this.prototype,
    copy = function(name) { Class[name] = this[name]; },

    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    prototype = Object.create(_super);
    prop = prop || {};
    stat = stat || {};

    function protochain(name, fn) {
      var applySuper = function() {return _super[name].apply(this,arguments);};
      return function() {
        var hadSuper = this.hasOwnProperty('_super'), tmp = this._super;

        // Add a new ._super() method that is the same method
        // but on the super-class
        this._super = applySuper;

        // The method only need to be bound temporarily, so we
        // remove it when we're done executing
        try {
          return fn.apply(this, arguments);
        }
        catch(e) {
          // Rethrow catch for IE 8
          throw e;
        }
        finally {
          if (hadSuper) {this._super = tmp;}
        }
      };
    }

    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if (typeof this.init === "function") {
        this.init.apply(this, arguments);
      }
    }

    // Copy the properties over onto the new prototype
    Object.keys(prop).forEach(function(name) {
      var p = prop[name];
      // Check if we're overwriting an existing function
      prototype[name] = 
        typeof p === "function" &&
        typeof _super[name] === "function" &&
        fnTest.test(p) ?
        protochain(name, p) :
        p;
    });

    // Copy the superclass's static properties
    Object.keys(this).forEach(copy, this);

    // Override the provided static properties
    Object.keys(stat).forEach(copy, stat);

    // Populate our constructed prototype object
    Class.prototype = prototype;

    // Enforce the constructor to be what we expect
    Object.defineProperty(Class.prototype, "constructor", {value:Class});

    // Class guaranteed methods
    Object.defineProperties(Class, {
      extend: {value:extend, enumerable:false},
      mixin : {value:mixin},
      inherits: {value:inherits}
    });

    return Class;
  };

  Klass.extend = extend;

  return Klass;
});
